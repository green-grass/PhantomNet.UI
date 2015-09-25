var gulp = require("gulp"),
    rimraf = require("rimraf"),
    less = require("gulp-less"),
    path = require("path");

var paths = {
    less_flexslider_lib: "./bower_components/flexslider/css/*",

    less_flexslider_local: "./src/less/flexslider",
    less_local: "./src/less/phantomnet.less",

    fonts_source: [
        "./bower_components/flexslider/fonts/*"
    ],
    js_src: [
        "./bower_components/flexslider/jquery.flexslider.js",
        "./src/js/*.js"
    ],

    dist: "./dist",
    css_dist: "./dist/css",
    fonts_dist: "./dist/fonts",
    js_dist: "./dist/js"
};

gulp.task("clean:local", function (cb) {
    rimraf(paths.less_flexslider_local, cb);
});

gulp.task("clean:dist", function (cb) {
    rimraf(paths.dist, cb);
});

gulp.task("clean", ["clean:dist", "clean:local"]);

gulp.task("consolidate:less:flexslider", function () {
    gulp.src(paths.less_flexslider_lib)
        .pipe(gulp.dest(paths.less_flexslider_local));
});

gulp.task("consolidate:less", ["consolidate:less:flexslider"]);
gulp.task("consolidate", ["consolidate:less"]);

gulp.task("dist:less", function () {
    return gulp.src(paths.less_local)
        .pipe(less({
            relativeUrls: true
        }))
        .pipe(gulp.dest(paths.css_dist));
});

gulp.task("dist:fonts", function () {
    gulp.src(paths.fonts_source)
        .pipe(gulp.dest(paths.fonts_dist));
});

gulp.task("dist:js", function () {
    gulp.src(paths.js_src)
        .pipe(gulp.dest(paths.js_dist));
});

gulp.task("dist", ["dist:less", "dist:fonts", "dist:js"]);

gulp.task("default", ["dist"]);
