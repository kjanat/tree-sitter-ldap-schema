/**
 * @file Tree-sitter grammar for OpenLDAP / RFC 4512 LDAP schema files
 * @author Kaj Kowalski info@kajkowalski.nl
 * @license MIT
 */

export default grammar({
	name: 'ldap_schema',

	extras: $ => [
		/[\s\f\r\n\t]+/,
		$.comment,
	],

	word: $ => $.bare_word,

	conflicts: $ => [
		[$.qdescrs, $.descr],
		[$.oid_reference, $.descr],
	],

	rules: {
		source_file: $ => repeat($._statement),

		_statement: $ =>
			choice(
				$.objectclass_definition,
				$.attributetype_definition,
				$.ditcontentrule_definition,
				$.ditstructurerule_definition,
				$.nameform_definition,
				$.matchingrule_definition,
				$.matchingruleuse_definition,
				$.ldapsyntax_definition,
				$.objectidentifier_definition,
				// Bare definition for LDIF injection (olcAttributeTypes/olcObjectClasses values)
				$.definition,
			),

		comment: _ =>
			token(choice(
				seq('#', /.*/),
				seq('//', /.*/),
			)),

		// OpenLDAP extension: objectidentifier name value
		// value can be: numeric OID, symbolic ref (name:suffix), or bare name
		objectidentifier_definition: $ =>
			seq(
				alias(ci('objectidentifier'), $.keyword),
				field('name', $.bare_word),
				field('value', $._oid_value),
			),

		objectclass_definition: $ =>
			seq(
				alias(ci('objectclass'), $.keyword),
				$.definition,
			),

		attributetype_definition: $ =>
			seq(
				alias(ci('attributetype'), $.keyword),
				$.definition,
			),

		ditcontentrule_definition: $ =>
			seq(
				alias(ci('ditcontentrule'), $.keyword),
				$.definition,
			),

		// RFC 4512 §4.1.7.1 - uses ruleid (number), not OID
		ditstructurerule_definition: $ =>
			seq(
				alias(ci('ditstructurerule'), $.keyword),
				$.ruleid_definition,
			),

		// RFC 4512 §4.1.7.2
		nameform_definition: $ =>
			seq(
				alias(ci('nameform'), $.keyword),
				$.definition,
			),

		matchingrule_definition: $ =>
			seq(
				alias(ci('matchingrule'), $.keyword),
				$.definition,
			),

		matchingruleuse_definition: $ =>
			seq(
				alias(ci('matchingruleuse'), $.keyword),
				$.definition,
			),

		ldapsyntax_definition: $ =>
			seq(
				alias(ci('ldapsyntax'), $.keyword),
				$.definition,
			),

		// Standard definition with OID
		definition: $ =>
			seq(
				'(',
				field('oid', $._oid_value),
				repeat($.clause),
				')',
			),

		// DITStructureRule uses ruleid (number) instead of OID
		ruleid_definition: $ =>
			seq(
				'(',
				field('ruleid', $.number),
				repeat($.ditstructurerule_clause),
				')',
			),

		// Clauses valid in DITStructureRule (uses ruleid_list for SUP)
		ditstructurerule_clause: $ =>
			choice(
				$.name_clause,
				$.desc_clause,
				$.obsolete_clause,
				$.ditstructurerule_sup_clause,
				$.form_clause,
				$.x_clause,
				$.generic_tag_clause,
			),

		// SUP for DITStructureRule uses numeric rule IDs
		ditstructurerule_sup_clause: $ =>
			seq(
				alias(ci('SUP'), $.keyword),
				field('value', $.ruleid_list),
			),

		// List of numeric rule IDs
		ruleid_list: $ =>
			choice(
				seq('(', field('items', $.number), repeat(seq('$', field('items', $.number))), ')'),
				$.number,
			),

		clause: $ =>
			choice(
				$.name_clause,
				$.desc_clause,
				$.obsolete_clause,
				$.sup_clause,
				$.equality_clause,
				$.ordering_clause,
				$.substr_clause,
				$.syntax_clause,
				$.single_value_clause,
				$.collective_clause,
				$.no_user_modification_clause,
				$.usage_clause,
				$.kind_clause,
				$.must_clause,
				$.may_clause,
				$.applies_clause,
				$.aux_clause,
				$.not_clause,
				$.form_clause,
				$.oc_clause,
				$.x_clause,
				$.generic_tag_clause,
			),

		name_clause: $ =>
			seq(
				alias(ci('NAME'), $.keyword),
				field('value', choice($.qdstring, $.qdescrs)),
			),

		desc_clause: $ =>
			seq(
				alias(ci('DESC'), $.keyword),
				field('value', $.qdstring),
			),

		obsolete_clause: $ => alias(ci('OBSOLETE'), $.keyword),

		sup_clause: $ =>
			seq(
				alias(ci('SUP'), $.keyword),
				field('value', $.oid_list),
			),

		equality_clause: $ => seq(alias(ci('EQUALITY'), $.keyword), field('value', $._oid_ref)),
		ordering_clause: $ => seq(alias(ci('ORDERING'), $.keyword), field('value', $._oid_ref)),
		substr_clause: $ => seq(alias(ci('SUBSTR'), $.keyword), field('value', $._oid_ref)),
		syntax_clause: $ => seq(alias(ci('SYNTAX'), $.keyword), field('value', $.syntax_spec)),
		single_value_clause: $ => alias(ci('SINGLE-VALUE'), $.keyword),
		collective_clause: $ => alias(ci('COLLECTIVE'), $.keyword),
		no_user_modification_clause: $ => alias(ci('NO-USER-MODIFICATION'), $.keyword),
		usage_clause: $ => seq(alias(ci('USAGE'), $.keyword), field('value', $.usage_kind)),
		kind_clause: $ =>
			field(
				'value',
				choice(
					alias(ci('ABSTRACT'), $.keyword),
					alias(ci('STRUCTURAL'), $.keyword),
					alias(ci('AUXILIARY'), $.keyword),
				),
			),
		must_clause: $ => seq(alias(ci('MUST'), $.keyword), field('value', $.oid_list)),
		may_clause: $ => seq(alias(ci('MAY'), $.keyword), field('value', $.oid_list)),
		applies_clause: $ => seq(alias(ci('APPLIES'), $.keyword), field('value', $.oid_list)),
		aux_clause: $ => seq(alias(ci('AUX'), $.keyword), field('value', $.oid_list)),
		not_clause: $ => seq(alias(ci('NOT'), $.keyword), field('value', $.oid_list)),
		form_clause: $ => seq(alias(ci('FORM'), $.keyword), field('value', $._oid_ref)),
		oc_clause: $ => seq(alias(ci('OC'), $.keyword), field('value', $._oid_ref)),

		generic_tag_clause: $ =>
			seq(
				field('tag', $.bare_word),
				field('value', choice($.qdescrs, $.oid_list, $.number)),
			),

		x_clause: $ =>
			seq(
				field('tag', $.x_tag),
				field('value', choice($.qdstring, $.qdescrs)),
			),

		// SYNTAX OID with optional length constraint
		syntax_spec: $ => seq($._oid_ref, optional(seq('{', $.number, '}'))),

		usage_kind: $ =>
			choice(
				alias(ci('userApplications'), $.keyword),
				alias(ci('directoryOperation'), $.keyword),
				alias(ci('distributedOperation'), $.keyword),
				alias(ci('dSAOperation'), $.keyword),
			),

		qdescrs: $ => seq('(', repeat1($.qdstring), ')'),

		oid_list: $ =>
			choice(
				seq('(', field('items', $.oid_item), repeat(seq(choice('$', '&'), field('items', $.oid_item))), ')'),
				$.oid_item,
			),

		oid_item: $ => choice($.oid, $.oid_reference, $.descr),

		// OID reference: numeric OID or symbolic reference (no quoted strings)
		_oid_ref: $ => choice($.oid, $.oid_reference),

		// OID value: includes quoted strings for objectidentifier directive
		_oid_value: $ => choice($.oid, $.oid_reference, $.qdstring),

		// Numeric OID: 1.2.3.4
		oid: _ => token(seq(/[0-9]+/, repeat1(seq('.', /[0-9]+/)))),

		// Symbolic OID reference: name or name:suffix (OpenLDAP extension)
		// e.g., OpenLDAProot, OpenLDAProot:1, NSDSat:5, SunDS:9.1.596
		oid_reference: $ => seq($.bare_word, optional(seq(':', $.oid_suffix))),

		// OID suffix after colon: can be dotted like 2.27 or 9.1.596
		oid_suffix: _ => token(seq(/[0-9]+/, repeat(seq('.', /[0-9]+/)))),

		number: _ => token(/[0-9]+/),
		x_tag: _ => token(/X-[A-Za-z][A-Za-z0-9_-]*/),
		descr: $ => choice($.bare_word, $.qdstring),
		bare_word: _ => token(/[A-Za-z_][A-Za-z0-9;._-]*/),
		// RFC 4512: qdstring can contain any character except unescaped quote
		qdstring: _ => token(seq("'", repeat(choice(/[^'\\]/, /\\./)), "'")),
	},
});

// Case-insensitive keyword matcher
/** @param {string} keyword */
function ci(keyword) {
	return new RegExp(
		keyword
			.split('')
			.map(/** @param {string} ch */ ch => {
				if (/[-]/.test(ch)) return `\\${ch}`;
				if (/[a-zA-Z]/.test(ch)) return `[${ch.toLowerCase()}${ch.toUpperCase()}]`;
				return ch;
			})
			.join(''),
	);
}
