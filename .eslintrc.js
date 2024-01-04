require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'vue/attributes-order': [
			'error',
			{
				order: [
					'DEFINITION',
					'LIST_RENDERING',
					'CONDITIONALS',
					'RENDER_MODIFIERS',
					'TWO_WAY_BINDING',
					'ATTR_DYNAMIC',
					'GLOBAL',
					['UNIQUE', 'SLOT'],
					['ATTR_STATIC', 'ATTR_SHORTHAND_BOOL'],
					'EVENTS',
					'CONTENT'
				],
				alphabetical: false
			}
		],
		'vue/component-tags-order': [
			'error',
			{
				order: ['script', 'template', 'style']
			}
		],
		'vue/v-slot-style': ['error', 'shorthand'],
		'vue/component-name-in-template-casing': [
			'error',
			'PascalCase',
			{ registeredComponentsOnly: false }
		],
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'any',
					normal: 'any',
					component: 'always'
				}
			}
		],
		'vue/html-indent': ['error', 'tab']
	}
};













/*
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
}
*/
