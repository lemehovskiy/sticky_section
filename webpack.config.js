module.exports = {
    watch: true,
    entry: './src/sticky_section.es6',
    output: {
        filename: 'build/sticky_section.js'
    },
    module: {
        rules: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};