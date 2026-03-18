; Textobjects for LDAP schema files
; Used by editors like Helix for structural selection

; class = entire definition blocks
(objectclass_definition) @class.around
(attributetype_definition) @class.around
(objectidentifier_definition) @class.around
(ditcontentrule_definition) @class.around
(ditstructurerule_definition) @class.around
(nameform_definition) @class.around
(matchingrule_definition) @class.around
(matchingruleuse_definition) @class.around
(ldapsyntax_definition) @class.around

; function = definition body (inside parens)
(definition) @function.around
(ruleid_definition) @function.around

; parameter = individual clauses
(clause) @parameter.around
(ditstructurerule_clause) @parameter.around

(name_clause) @parameter.around
(desc_clause) @parameter.around
(sup_clause) @parameter.around
(must_clause) @parameter.around
(may_clause) @parameter.around
(aux_clause) @parameter.around
(not_clause) @parameter.around
(applies_clause) @parameter.around
(equality_clause) @parameter.around
(ordering_clause) @parameter.around
(substr_clause) @parameter.around
(syntax_clause) @parameter.around
(usage_clause) @parameter.around
(kind_clause) @parameter.around
(form_clause) @parameter.around
(oc_clause) @parameter.around
(ditstructurerule_sup_clause) @parameter.around
(x_clause) @parameter.around
(generic_tag_clause) @parameter.around

; comment
(comment) @comment.around
