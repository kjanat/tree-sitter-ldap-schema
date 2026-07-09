extern fn tree_sitter_ldap_schema() callconv(.c) *const anyopaque;

pub fn language() *const anyopaque {
    return tree_sitter_ldap_schema();
}
