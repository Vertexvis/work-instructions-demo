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
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		project: './tsconfig.json',
	},
	plugins: ['simple-import-sort'],
	rules: {
		'no-await-in-loop': 'warn',
		'no-duplicate-imports': ['error', { includeExports: true }],
		'require-await': 'error',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
	settings: { react: { version: 'detect' } },
	ignorePatterns: ['next.config.js', '.eslintrc.js'],
};
