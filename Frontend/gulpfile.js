"use strict";
var gulp = require("gulp");  
var sourcemaps = require('gulp-sourcemaps');
// var replace = require('gulp-string-replace');

/**
 * Started from: http://tattoocoder.com/deploying-an-angular-2-app-to-azure-with-github/
 * adapted to work with current angular version
 */

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "index","cfg", "app", "assets","img","fonts"], function () {  
    console.log("Building resources...");
});

/* copy the app core files to the build folder */
gulp.task("app", function(){  
    return gulp.src(["src/app/**", "!src/app/**/*.ts","!node_modules"])
        .pipe(gulp.dest("build/app"));
});


/* copy node server to build folder with adapted index and systemjs cfg ==> to be fixed later (see code below)*/
gulp.task("server", function () {  
    return gulp.src(["index.js", "package.json","index.html","systemjs.config.js"], { cwd: "server/**" })
        .pipe(gulp.dest("build"));
});
/* styles and other assets */
gulp.task("assets", function(){  
    return gulp.src(["src/styles.css","src/bootstrap.min.css","src/font-awesome.min.css","src/img","src/fonts"])
        .pipe(gulp.dest("build"));
});
gulp.task("img", function(){  
    return gulp.src(["src/img/**"])
        .pipe(gulp.dest("build/img"));
});
gulp.task("fonts", function(){  
    return gulp.src(["src/fonts/**"])
        .pipe(gulp.dest("build/fonts"));
});


/**
 * This has been commented out and set-up with a workaround of duplicate files in server directory ==> to be fixed
 * 
 */
// gulp.task("index", function () {  
//     return gulp.src(["src/index.html"])
//         .pipe(gulp.dest("build"));
// });
// gulp.task("cfg", function () {  
//    return gulp.src(["cfg/**"])
//         .pipe(gulp.dest("build"));
// });

// /**
//  * Replace devlibs and alter sourcpath configfile
//  */
// gulp.task("replace", ["replace_cfg", "replace_cfglib","replace_cfgpath"], function () {  
//     console.log("Altering paths...");
// });
// gulp.task('replace_cfg', function() {
//    return gulp.src(["build/systemjs.config.js"])
//     .pipe(replace("app: 'src/app',", "app: 'app',"))
//     .pipe(gulp.dest("build/systemjs.config.js"))
// });
// gulp.task('replace_cfglib', function() {
//    return gulp.src(["build/systemjs.config.js"])
//     .pipe(replace("'@angular/http/testing':'npm:@angular/http/bundles/http-testing.umd.js',", ""))
//     .pipe(gulp.dest("build/systemjs.config.js"))
// });
// gulp.task('replace_cfgpath', function() {
//    return gulp.src(["build/index.html"])
//     .pipe(replace("<script src=\"/cfg/systemjs.config.js\"></script>", "<script src=\"systemjs.config.js\"></script>"))
//     .pipe(gulp.dest("build/systemjs.config.js"))
// });

/**
 * Copy all required libraries into build directory.
 */


gulp.task("libs", function () {  
    return gulp.src([
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources','replace', 'libs'], function () {  
    console.log("Building the project ...");
});