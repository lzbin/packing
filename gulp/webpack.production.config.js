var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var config = require('./gulp.config')();

var ROOT_PATH = path.resolve(process.cwd());
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var DIST_PATH = path.resolve(ROOT_PATH, 'dist');
var TMP_PATH = path.resolve(ROOT_PATH, 'tmp');

// 获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(SRC_PATH, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(SRC_PATH, 'js', item);
        }
    });
    return files;
}

function addVendor() {
    var files = getEntry();
    files['vendor'] = ['jquery'];
    return files;
}

module.exports = {
    entry: addVendor(),
    output: {
        path: path.join(TMP_PATH, 'js'),
        filename: '[name].js'
    },
    resolve: {
        alias: config.alias
    },
    externals: config.externals,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
};
