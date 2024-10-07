const { resolve } = require('path');

// See https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
module.exports = {
	swcMinify: true,
	output: 'standalone',
	webpack: (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					'@components': resolve(__dirname, 'src/components'),
					'@lib': resolve(__dirname, 'src/lib'),
				},
			},
		};
	},
};
