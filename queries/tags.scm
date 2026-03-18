; Code navigation tags for LDAP schema definitions
; Used by GitHub search-based code navigation and `tree-sitter tags`

; objectclass definitions
(objectclass_definition
  (definition
    (clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.class

(objectclass_definition
  (definition
    (clause
      (name_clause
        value: (qdescrs
          (qdstring) @name))))
  ) @definition.class

; attributetype definitions
(attributetype_definition
  (definition
    (clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.class

(attributetype_definition
  (definition
    (clause
      (name_clause
        value: (qdescrs
          (qdstring) @name))))
  ) @definition.class

; objectidentifier alias definitions
(objectidentifier_definition
  name: (bare_word) @name) @definition.module

; matchingrule definitions
(matchingrule_definition
  (definition
    (clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.function

(matchingrule_definition
  (definition
    (clause
      (name_clause
        value: (qdescrs
          (qdstring) @name))))
  ) @definition.function

; matchingruleuse definitions
(matchingruleuse_definition
  (definition
    (clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.function

; ldapsyntax definitions
(ldapsyntax_definition
  (definition
    (clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.interface

; ditcontentrule definitions
(ditcontentrule_definition
  (definition
    (clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.class

; nameform definitions
(nameform_definition
  (definition
    (clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.class

; ditstructurerule definitions
(ditstructurerule_definition
  (ruleid_definition
    (ditstructurerule_clause
      (name_clause
        value: (qdstring) @name)))
  ) @definition.class

; References to named schema elements in SUP clauses
(sup_clause
  value: (oid_list
    (oid_item
      (oid_reference
        (bare_word) @name)))) @reference.class

; References to matching rules
(equality_clause
  value: (oid_reference
    (bare_word) @name)) @reference.call

(ordering_clause
  value: (oid_reference
    (bare_word) @name)) @reference.call

(substr_clause
  value: (oid_reference
    (bare_word) @name)) @reference.call
