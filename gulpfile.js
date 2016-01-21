'use strict'

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var slim = require('gulp-slim');
var autoprefixer = require('autoprefixer');
var customProperties = require("postcss-custom-properties");
var customMedia = require("postcss-custom-media");
var colorRgbaFallback = require("postcss-color-rgba-fallback");
var pixrem  = require('pixrem');
var cssnano = require('cssnano');

var path = {
	post_src : 'webroot/postcss/*.css',
	css_dest : 'webroot/css',
  slim_src : 'webroot/slim/*.slim',
  home : './'
}

// postCSSのコンパイル
gulp.task('css', function () {
  gulp.src( path.post_src )
		.pipe(postcss([
			autoprefixer(),
			require('postcss-nested'), //saccのようなネスト
			require("postcss-custom-properties"), //色の変数
			require("postcss-custom-media"), //メディアクエリ
			require("postcss-color-rgba-fallback"), //RGBAで指定できる
			require('pixrem'), // remで指定できる
			require('postcss-size'), //widthとheightをsizeで記述
			require("postcss-selector-matches"), // :first-childなどが使える
			require('postcss-mixins'), //mixinが使えるようになる
			require('cssnano'), //minifyする
		]))
    .pipe(gulp.dest( path.css_dest ) )
});

// Slimのコンパイル
gulp.task('slim', function() {
  gulp.src( path.slim_src )
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest( path.home ))
});

//watch
gulp.task('watch', function() {
  gulp.watch( [path.slim_src], ['slim'] );
	gulp.watch( [path.post_src], ['css'] );
	return gulp.watch( [ path.css_dest + '/*.css']);
});

gulp.task('default',['watch']);
