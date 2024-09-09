module.exports = {
	root: true,
	env: { browser: true, es2021: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'next/core-web-vitals',
		'next/typescript',
		'plugin:prettier/recommended',

		// "eslint-plugin-simple-import-sort": "^12.1.1",
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		// ecmaFeatures: { jsx: true },
		project: './tsconfig.json',
	},
	plugins: ['simple-import-sort'],
	rules: {
		'no-await-in-loop': 'warn',
		'no-duplicate-imports': ['error', { includeExports: true }],
		'require-await': 'error',
		//   "react/react-in-jsx-scope": "off",
		//   "react-hooks/rules-of-hooks": "error",
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
	settings: { react: { version: 'detect' } },
};
