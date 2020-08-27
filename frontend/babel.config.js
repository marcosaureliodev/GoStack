const { NamedModulesPlugin } = require("webpack");

// PRESETS: são conjuntos de configurações criadas por terceiros (outras pessoas).
module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react'
	],
	plugins: [
		'@babel/plugin-transform-runtime'
	]
};