import * as path from 'path';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin }  from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const isDev = false;process.env.NODE_ENV !== 'production';

const config = {
    mode: isDev ? 'development' : 'production',
    entry: './app/index.tsx',
	target: 'electron-renderer',
    output: {
        path: path.resolve('build', 'app'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [
            ".ts",
            ".tsx",
            ".js",
            ".jsx",
            ".json",
            ".wasm",
            ".mjs",
            "*"
        ]
    },
    module: {
        rules: [
			{
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', "sass-loader"],
			},
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/transform-runtime"]
                    }
                },
                exclude: [/node_modules/, /dist/, /static/]
            }
        ]
    },
    externals: [
        function () {
            var arg1 = arguments[0];
            var arg2 = arguments[1];
            var arg3 = arguments[2];

            if (/^moroboxai.*$/.test(arg2)) {
                return arg3();
            }

            nodeExternals()(arg1, arg2, arg3);
        },
        {
            MoroboxAIPlayerSDK: 'moroboxai-player-sdk',
            MoroboxAIPlayer: 'moroboxai-player-web',
            Player: 'moroboxai-player-react'
        }
    ],
    plugins: [
        new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
            title: 'React Electron App'
        }),
    ],
    devServer: {
        contentBase: path.join('build', 'app'),
        compress: true,
		host: '0.0.0.0',
        port: 8080,
        hot: true
    },
    optimization: {
        minimize: !isDev
    },
    devtool: 'inline-source-map'
};

export default config;