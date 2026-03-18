(comment) @comment
(oid) @constant.numeric
(oid_suffix) @constant.numeric
(number) @constant.numeric
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
] @punctuation.delimiter

":" @punctuation.delimiter

; Names in NAME clause (green - type)
(name_clause
  value: (qdstring) @type)

(name_clause
  value: (qdescrs (qdstring) @type))

(desc_clause
  value: (qdstring) @string)

(objectidentifier_definition
  name: (bare_word) @constant)

(generic_tag_clause
  tag: (bare_word) @attribute)

(x_clause
  tag: (x_tag) @attribute)

; SUP references are types (green)
(sup_clause
  value: (oid_list (oid_item (oid_reference (bare_word) @type))))

; MUST/MAY/AUX/NOT/APPLIES attribute names (orange - constant)
(must_clause
  value: (oid_list
    (oid_item
      (oid_reference
        (bare_word) @constant))))

(may_clause
  value: (oid_list
    (oid_item
      (oid_reference
        (bare_word) @constant))))

(applies_clause
  value: (oid_list
    (oid_item
      (oid_reference
        (bare_word) @constant))))

(aux_clause
  value: (oid_list
    (oid_item
      (oid_reference
        (bare_word) @constant))))

(not_clause
  value: (oid_list
    (oid_item
      (oid_reference
        (bare_word) @constant))))

; EQUALITY/ORDERING/SUBSTR matching rules (green - function)
(equality_clause
  value: (oid_reference (bare_word) @function))

(ordering_clause
  value: (oid_reference (bare_word) @function))

(substr_clause
  value: (oid_reference (bare_word) @function))
