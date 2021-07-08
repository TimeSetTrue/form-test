"use strict";

const gulp = require('gulp'),
	  browserSync = require('browser-sync'),
	  webpack = require('webpack-stream'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  rename = require("gulp-rename");
    //C:/MAMP/htdocs/text
const dist = "./dist/";

gulp.task("copy-html", () => {
    return gulp.src("./src/*.html")
                .pipe(gulp.dest(dist))
                .pipe(browserSync.stream());
});

gulp.task('copy-assets', () => {
	return gulp
		.src("./src/assets/**/*.*")
		.pipe(gulp.dest(dist + "/assets/"))
		.on("end", browserSync.reload);
});

gulp.task('sass', () => {
	return gulp
		.src('./src/assets/sass/*.*')
		.pipe(
			sass({
				outputStyle: "expanded",
			}),
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 8 versions"],
				browsers: [	
					"Android >= 4",
					"Chrome >= 20",
					"Firefox >= 24",
					"Explorer >= 11",
					"iOS >= 6",
					"Opera >= 12",
					"Safari >= 6",
				],
			}),
		)
		
		.pipe(gulp.dest('./dist/assets/sass'))
    	.on("end", browserSync.reload);
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browserSync.reload);
});

gulp.task("watch", () => {
    browserSync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/*.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
	  gulp.watch("./src/assets/**/*.*", gulp.parallel("sass"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js", "sass"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browserSync.reload);
});

gulp.task("default", gulp.parallel("watch", "build"));

