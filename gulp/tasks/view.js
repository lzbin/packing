module.exports = function (gulp, plugins, config) {
    // html依赖替换
    gulp.task('include', function() {
        return gulp.src(config.src + 'html/page/*.html')
            .pipe(gulp.dest(config.dist + 'html/page'));
    });

    // 替换已经打包的静态资源
    gulp.task('usemin:html', function() {
        return gulp.src([
                config.tmp + 'rev/**/*.json',
                config.dist + 'html/**/*.html'
            ])
            .pipe(plugins.revCollector())
            .pipe(gulp.dest(config.dist + 'html'));
    });
};
