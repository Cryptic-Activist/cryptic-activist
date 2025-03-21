const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	stories: [
		"../stories/**/*.stories.mdx",
		"../stories/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	framework: "@storybook/react",
	webpackFinal: async (config, {configType}) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need

        // Allows importing sass or scss files
        config.module.rules.push({
            test: /\.scss|.sass$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, '../tsconfig.json')
            }),
        ];

        // Return the altered config
        return config;
    },
};
