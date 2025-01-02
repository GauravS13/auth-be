import parser from '@typescript-eslint/parser';
import globals from 'globals';

/** @type {import('eslint').Linter.Config} */
export default {
  root: true, // Ensures this configuration is root and stops ESLint from looking for other configs
  ignorePatterns: ['node_modules/', 'dist/', '*.d.ts'], // Ignore unnecessary files
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts}'],
      languageOptions: {
        parser: parser, // Use TypeScript parser
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.node,
          ...globals.commonjs,
        },
      },
      plugins: [
        '@typescript-eslint',
        'prettier',
        'security',
        'eslint-plugin-import',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:security/recommended', // Adds security checks
        'plugin:import/errors', // Ensures proper import/export usage
        'plugin:import/warnings',
        'plugin:import/typescript', // TypeScript-specific imports
        'plugin:prettier/recommended', // Integrates Prettier
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        // General rules
        'no-console': 'warn', // Warn for console.logs to encourage proper logging
        'no-debugger': 'error', // No debugger statements in production
        curly: 'error', // Enforce curly braces for readability
        eqeqeq: ['error', 'always'], // Enforce strict equality

        // TypeScript-specific rules
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ], // Allow unused variables starting with "_"
        '@typescript-eslint/explicit-function-return-type': 'error', // Enforce explicit return types
        '@typescript-eslint/no-explicit-any': 'warn', // Discourage use of `any`
        '@typescript-eslint/no-non-null-assertion': 'error', // No non-null assertions
        '@typescript-eslint/consistent-type-imports': 'error', // Prefer `import type`

        // Import rules
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'always',
          },
        ],
        'import/newline-after-import': 'error', // Add newline after import statements
        'import/no-unresolved': 'error', // No unresolved imports
        'import/no-cycle': 'error', // Detect circular dependencies

        // Prettier rules
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            semi: true,
            trailingComma: 'all',
            printWidth: 80,
            tabWidth: 2,
          },
        ],

        // Security rules
        'security/detect-object-injection': 'warn', // Warn against object injection vulnerabilities
      },
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ], // Ignores unused variables starting with "_"
      'no-unused-vars': 'off', // Disable base rule since we use @typescript-eslint version
      'import/no-unused-modules': [1, { unusedExports: true }], // Warn about unused exports
      'unused-imports/no-unused-imports': 'error', // Removes unused imports
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    {
      files: ['**/*.js'],
      languageOptions: {
        sourceType: 'commonjs',
      },
    },
  ],
};
