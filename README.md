# tree-sitter-ldap-schema

A Tree-sitter grammar for LDAP schema files, aimed at OpenLDAP-style `.schema` files and RFC 4512 schema descriptions.

It parses directives like:

- `objectclass ( ... )`
- `attributetype ( ... )`
- `matchingrule ( ... )`
- `matchingruleuse ( ... )`
- `ldapsyntax ( ... )`
- `ditcontentrule ( ... )`
- `ditstructurerule ( ... )`
- `nameform ( ... )`
- `objectidentifier name value`

## Status

This grammar is intentionally permissive in a few places because LDAP schema syntax is compact, old, and full of vendor extensions.

Supported well:

- OIDs and descriptors
- Symbolic OID references (`OpenLDAProot:1`)
- `NAME`, `DESC`, `SUP`, `MUST`, `MAY`, `SYNTAX`, `USAGE`
- `ABSTRACT`, `STRUCTURAL`, `AUXILIARY`
- vendor `X-*` clauses
- parenthesized `$` lists
- comments beginning with `#` or `//`

Also tolerated:

- quoted descriptors in some positions
- `&` as a list separator, because real-world schema files occasionally contain weird sludge

## Development

```bash
npm install
npm run generate
npm test
```
