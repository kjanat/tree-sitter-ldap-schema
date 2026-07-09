import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.ldapschema.TreeSitterLdapSchema;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterLdapSchemaTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterLdapSchema.language()));
    }
}
