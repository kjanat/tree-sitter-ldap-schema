import XCTest
import SwiftTreeSitter
import TreeSitterLdapSchema

final class TreeSitterLdapSchemaTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_ldap_schema())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading LDAP Schema grammar")
    }
}
