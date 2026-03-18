(comment) @comment
(oid) @number
(oid_suffix) @number
(number) @number
(qdstring) @string
(x_tag) @attribute
(keyword) @keyword

[
  "("
  ")"
  "{"
  "}"
] @punctuation.bracket

[
  "$"
  "&"
  ":"
] @operator

(name_clause
  value: (qdstring) @type)

(name_clause
  value: (qdescrs (qdstring) @type))

(desc_clause
  value: (qdstring) @string)

(objectidentifier_definition
  name: (bare_word) @constant)

(generic_tag_clause
  tag: (bare_word) @property)

(x_clause
  tag: (x_tag) @attribute)

; OID references in various clauses
(oid_reference
  (bare_word) @type)

(sup_clause
  value: (oid_list (oid_item (oid_reference (bare_word) @type))))

(must_clause
  value: (oid_list (oid_item (oid_reference (bare_word) @property))))

(may_clause
  value: (oid_list (oid_item (oid_reference (bare_word) @property))))

(applies_clause
  value: (oid_list (oid_item (oid_reference (bare_word) @property))))

(aux_clause
  value: (oid_list (oid_item (oid_reference (bare_word) @property))))

(not_clause
  value: (oid_list (oid_item (oid_reference (bare_word) @property))))
