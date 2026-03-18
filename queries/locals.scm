; Local variable tracking for LDAP schema files
;
; objectidentifier directives define OID aliases that are referenced
; by oid_reference nodes throughout the file.

; The entire file is a single scope
(source_file) @local.scope

; objectidentifier directives define named OID aliases
(objectidentifier_definition
  name: (bare_word) @local.definition)

; Symbolic OID references may refer to objectidentifier definitions
(oid_reference
  (bare_word) @local.reference)
