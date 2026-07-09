from unittest import TestCase

import tree_sitter_ldap_schema

from tree_sitter import Language, Parser


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        # an uncaught exception fails the test on its own
        _ = Parser(Language(tree_sitter_ldap_schema.language()))
