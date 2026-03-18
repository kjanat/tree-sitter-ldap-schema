/// <reference types="tree-sitter-cli/dsl" />

const PREC = {
	COMMENT: -1,
};

module.exports = grammar({
	name: 'ldap_schema',

	extras: $ => [
		/[\s\f\r\n\t]+/,
		$.comment,
	],

	word: $ => $.bare_word,

	conflicts: $ => [
		[$.qdescrs, $.descr],
	],

	rules: {
		source_file: $ => repeat($._statement),

		_statement: $ =>
			choice(
				$.objectclass_definition,
				$.attributetype_definition,
				$.ditcontentrule_definition,
				$.matchingrule_definition,
				$.matchingruleuse_definition,
				$.ldapsyntax_definition,
				$.objectidentifier_definition,
			),

		comment: _ =>
			token(choice(
				seq('#', /.*/),
				seq('//', /.*/),
			)),

		objectidentifier_definition: $ =>
			seq(
				alias(ci('objectidentifier'), $.keyword),
				field('name', $.bare_word),
				field('value', choice($.oid, $.qdstring, $.bare_word)),
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

		definition: $ =>
			seq(
				'(',
				field('oid', $.oid),
				repeat($.clause),
				')',
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

		equality_clause: $ => seq(alias(ci('EQUALITY'), $.keyword), field('value', choice($.oid, $.descr))),
		ordering_clause: $ => seq(alias(ci('ORDERING'), $.keyword), field('value', choice($.oid, $.descr))),
		substr_clause: $ => seq(alias(ci('SUBSTR'), $.keyword), field('value', choice($.oid, $.descr))),
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
		form_clause: $ => seq(alias(ci('FORM'), $.keyword), field('value', choice($.oid, $.descr))),
		oc_clause: $ => seq(alias(ci('OC'), $.keyword), field('value', choice($.oid, $.descr))),

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

		syntax_spec: $ => seq($.oid, optional(seq('{', $.number, '}'))),

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

		oid_item: $ => choice($.oid, $.descr),

		oid: _ => token(seq(/[0-9]+/, repeat(seq('.', /[0-9]+/)))),
		number: _ => token(/[0-9]+/),
		x_tag: _ => token(/X-[A-Za-z][A-Za-z0-9-]*/),
		descr: $ => choice($.bare_word, $.qdstring),
		bare_word: _ => token(/[A-Za-z_][A-Za-z0-9;._-]*/),
		qdstring: _ => seq("'", repeat(choice(/[^'\\\n\r]/, /\\./)), "'"),
	},
});

function ci(keyword) {
	return new RegExp(
		keyword
			.split('')
			.map(ch => {
				if (/[-]/.test(ch)) return `\\${ch}`;
				if (/[a-zA-Z]/.test(ch)) return `[${ch.toLowerCase()}${ch.toUpperCase()}]`;
				return ch;
			})
			.join(''),
	);
}
