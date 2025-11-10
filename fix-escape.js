import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const langsDir = path.join(__dirname, 'src', 'i18n', 'langs');
const langFiles = ['zh', 'en', 'zh-TW', 'ja', 'kr', 'ru'];

// Function to fix escape sequences for vue-i18n
function fixEscapeInContent(content) {
    // Replace incorrect escapes with correct ones
    // '{'  → {'{'}
    // '}'  → {'}'}
    // {'@'} is already correct

    return content
        .replace(/'{''/g, "{'{'}")
        .replace(/'}''/g, "{'}'}")
        .replace(/'{'/g, "{'{'}")
        .replace(/'}'/g, "{'}'}")
}

langFiles.forEach(lang => {
    const tsFile = path.join(langsDir, `${lang}.ts`);

    if (!fs.existsSync(tsFile)) {
        console.log(`Skipping ${lang}.ts - file not found`);
        return;
    }

    try {
        // Read the TypeScript file
        const content = fs.readFileSync(tsFile, 'utf8');

        // Fix escape sequences
        const fixedContent = fixEscapeInContent(content);

        // Write back to file
        fs.writeFileSync(tsFile, fixedContent, 'utf8');
        console.log(`✓ Fixed ${lang}.ts`);
    } catch (error) {
        console.error(`Error processing ${lang}.ts:`, error.message);
    }
});

console.log('\nFix complete!');
