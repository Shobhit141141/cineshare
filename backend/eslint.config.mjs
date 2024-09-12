import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules'] // Ignoring specific folders
  },
  {
    files: ['**/*.js', '**/*.mjs'], // Specify the file types to lint
    plugins: {
      prettier: prettierPlugin // Prettier plugin
    },
    languageOptions: {
      ecmaVersion: 'latest', // ECMAScript version
      sourceType: 'module' // ES Modules
    },
    rules: {
      ...prettierConfig.rules, // Import Prettier's rules
      'prettier/prettier': 'error', // Show Prettier formatting issues as ESLint errors
      'no-console': 'off' // Customize other rules if needed
    }
  }
];
