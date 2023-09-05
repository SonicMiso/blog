const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /.txt$/,
                use: [{
                    loader: 'raw-loader'
                }]
            }
        ],
    },
    resolve: {
        alias: {
            '@project': path.join(__dirname, '../../'),
            '@interview': path.join(__dirname, '../interview'),
            '@assert': path.join(__dirname, './public')
        }
    }
}
