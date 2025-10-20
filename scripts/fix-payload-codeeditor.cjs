#!/usr/bin/env node

/**
 * PostInstall script to fix Payload CMS CodeEditor bug
 * Based on solution from Reddit thread and GitHub issue #14006
 * 
 * This script patches the CodeEditor component to handle null/undefined values gracefully
 */

const fs = require('fs'); // eslint-disable-line
const path = require('path'); // eslint-disable-line

const codeEditorJsPath = path.join(__dirname, '..', 'node_modules', '@payloadcms', 'ui', 'dist', 'elements', 'CodeEditor', 'CodeEditor.js');
const codeEditorTsxPath = path.join(__dirname, '..', 'node_modules', '@payloadcms', 'ui', 'src', 'elements', 'CodeEditor', 'CodeEditor.tsx');

console.log('🔧 Applying Payload CMS CodeEditor fix...');

// Function to apply fixes to a file
function applyFixesToFile(filePath, fileType) {
  if (!fs.existsSync(filePath)) {
    console.log(`ℹ️  ${fileType} file not found: ${filePath}`);
    return false;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Fix 1: Direct value_0.split pattern
    if (content.includes('value_0.split("\\n").length')) {
      content = content.replace(/value_0\.split\("\\n"\)\.length/g, '(value_0 || "").split("\\n").length');
      hasChanges = true;
      console.log(`✅ Fixed value_0.split pattern in ${fileType}`);
    }

    // Fix 2: editor.getValue().split pattern
    if (content.includes('editor.getValue().split("\\n").length')) {
      content = content.replace(/editor\.getValue\(\)\.split\("\\n"\)\.length/g, '(editor.getValue() || "").split("\\n").length');
      hasChanges = true;
      console.log(`✅ Fixed editor.getValue().split pattern in ${fileType}`);
    }

    // Fix 3: General value.split patterns with different quote styles
    const valueSplitPatterns = [
      { pattern: /\bvalue\.split\("\\n"\)/g, replacement: '(value || "").split("\\n")' },
      { pattern: /\bvalue\.split\('\\n'\)/g, replacement: "(value || '').split('\\n')" },
      { pattern: /\bvalue\.split\(`\\n`\)/g, replacement: '(value || ``).split(`\\n`)' }
    ];

    valueSplitPatterns.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        hasChanges = true;
        console.log(`✅ Fixed value.split() pattern in ${fileType}`);
      }
    });

    // Fix 4: onChange value parameter protection
    if (content.includes('rest.onChange?.(value, ev)')) {
      content = content.replace(/rest\.onChange\?\.\(value,\s*ev\)/g, 'rest.onChange?.(value || "", ev)');
      hasChanges = true;
      console.log(`✅ Fixed onChange value parameter in ${fileType}`);
    }

    // Fix 5: Config destructuring issues
    const configPatterns = [
      { pattern: /const\s*{\s*config\s*}\s*=\s*ue\([^)]*\)/g, replacement: (match) => {
        const ueCall = match.match(/ue\([^)]*\)/)[0];
        return `const configResult = ${ueCall}; const { config } = configResult || {}`;
      }},
      { pattern: /const\s*{\s*config\s*}\s*=/g, replacement: 'const { config = {} } =' }
    ];

    configPatterns.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        if (typeof replacement === 'function') {
          content = content.replace(pattern, replacement);
        } else {
          content = content.replace(pattern, replacement);
        }
        hasChanges = true;
        console.log(`✅ Fixed config destructuring in ${fileType}`);
      }
    });

    // Fix 6: Split method calls with various variable names
    const splitPatterns = [
      /(\w+)\.split\(["'`]\\n["'`]\)\.length/g,
      /(\w+)\.split\(["'`]\n["'`]\)\.length/g
    ];

    splitPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, (match, varName) => {
          return `(${varName} || "").split("\\n").length`;
        });
        hasChanges = true;
        console.log(`✅ Fixed ${matches.length} split().length pattern(s) in ${fileType}`);
      }
    });

    // Fix 7: React 19 specific CodeEditor onChange fixes (issue #14006)
    const react19Fixes = [
      {
        pattern: /setDynamicHeight\(Math\.max\(MIN_HEIGHT,\s*value\.split\(['"`]\\?n['"`]\)\.length[^}]+\)/g,
        replacement: `setDynamicHeight(
          value
            ? Math.max(MIN_HEIGHT, value.split('\\n').length * 18 + 2 + paddingFromProps)
            : MIN_HEIGHT,
        )`
      },
      {
        pattern: /Math\.max\(MIN_HEIGHT,\s*value\.split\(['"`]\\?n['"`]\)\.length\s*\*\s*18\s*\+\s*2\s*\+\s*paddingFromProps\)/g,
        replacement: `value ? Math.max(MIN_HEIGHT, value.split('\\n').length * 18 + 2 + paddingFromProps) : MIN_HEIGHT`
      }
    ];

    react19Fixes.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        hasChanges = true;
        console.log(`✅ Fixed React 19 CodeEditor pattern in ${fileType}`);
      }
    });

    // Fix 8: useContext and hook result null checking for React 19
    const contextPatterns = [
      {
        pattern: /const\s*{\s*([^}]+)\s*}\s*=\s*ue\(([^)]+)\)/g,
        replacement: (match, destructured, contextCall) => {
          return `const contextResult = ue(${contextCall}) || {}; const { ${destructured} } = contextResult`;
        }
      },
      {
        pattern: /const\s*{\s*config\s*}\s*=\s*ue\([^)]*\)\s*\|\|\s*{}/g,
        replacement: 'const { config = {} } = ue(arguments[0]) || {}'
      }
    ];

    contextPatterns.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        if (typeof replacement === 'function') {
          content = content.replace(pattern, replacement);
        } else {
          content = content.replace(pattern, replacement);
        }
        hasChanges = true;
        console.log(`✅ Fixed React 19 context destructuring in ${fileType}`);
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${fileType} comprehensive fixes applied successfully!`);
      return true;
    } else {
      console.log(`ℹ️  ${fileType} - no fixes needed or already applied.`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Error applying ${fileType} fix:`, err.message);
    return false;
  }
}

// Apply fixes to both JS and TSX files
const jsFixed = applyFixesToFile(codeEditorJsPath, 'JavaScript');
const tsxFixed = applyFixesToFile(codeEditorTsxPath, 'TypeScript');

// Also fix any chunk files that might contain CodeEditor code
const uiDistPath = path.join(__dirname, '..', 'node_modules', '@payloadcms', 'ui', 'dist');
const chunkFiles = fs.readdirSync(path.join(uiDistPath, 'exports', 'client'))
  .filter(file => file.startsWith('chunk-') && file.endsWith('.js'))
  .map(file => path.join(uiDistPath, 'exports', 'client', file));

let chunkFixed = false;
chunkFiles.forEach(chunkPath => {
  if (applyFixesToFile(chunkPath, 'Chunk')) {
    chunkFixed = true;
  }
});

if (jsFixed || tsxFixed || chunkFixed) {
  console.log('🎉 Some fixes were applied! Restart your dev server for changes to take effect.');
} else {
  console.log('ℹ️  No fixes needed or all fixes already applied.');
}

console.log('🚀 PostInstall script completed.');