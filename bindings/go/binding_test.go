package tree_sitter_ldap_schema_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_ldap_schema "github.com/kjanat/tree-sitter-ldap-schema/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_ldap_schema.Language())
	if language == nil {
		t.Errorf("Error loading LDAP Schema grammar")
	}
}
