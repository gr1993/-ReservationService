/* eslint-disable */
module.exports = {
	"env": {
		"browser": true,
		"es2020": true
	},
	"globals": {
		"module": true
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"extends": [
		"airbnb",
		"airbnb/hooks",
		// "eslint:recommended",
		// "plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"rules": {
		'linebreak-style': ["error", "windows"],
		'react/prop-types': "off",
		"no-use-before-define": "off",
		"no-unused-expressions": "off",
		"@typescript-eslint/no-use-before-define": ["error"],
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", "ts", "tsx"] }],
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
				json: 'never'
			}
		]
	},
	"settings": {
		"import/resolver": {
			"node": {
				"extensions": [".js", ".jsx", ".ts", ".tsx"]
			}
		}
	},
};
