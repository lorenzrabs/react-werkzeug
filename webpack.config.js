const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        index: "./index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            // Add rules for loading and transpiling your components here
            // For example, for React components with Babel:
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
        }
    },
    externals: {
        'react': 'commonjs react'
    }
};
