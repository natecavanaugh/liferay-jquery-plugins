'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
	lint: ['./gulpfile.js', './src/**/*.js'],
	watch: ['./gulpfile.js', './src/**', './test/**/*.js', '!test/{temp,temp/**}'],
	tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
	source: ['./lib/*.js']
};

var plumberConf = {};

if (process.env.CI) {
	plumberConf.errorHandler = function(err) {
		throw err;
	};
}
// return gulp.src('./templates/_component.*', {read: false})
// 				.pipe(prompt.prompt([
// 						{
// 								type: 'input',
// 								name: 'userInput',
// 								message: 'Say something'
// 						}
// 				], function(res){
// 						myVar = res.userInput;
// 				}));

gulp.task('get-input', function() {
	return gulp.src('', {read: false})
			.pipe(
				plugins.prompt.prompt(
					[{
							name: 'name',
							type: 'input',
							message: 'Provide a name to your module'
					}],
					function(res) {
						exports.name = res.name;
					}
				)
			);

});

gulp.task('create-test', ['get-input'], function () {
		var name = exports.name;
		var nameMap = {
			'.js': name,
			'.html': 'index'
		};

		return gulp.src('assets/templates/test.*')
				// .pipe(plugins.using())
				.pipe(plugins.plumber(plumberConf))
				.pipe(plugins.template({
					name: name
				}))
				.pipe(plugins.rename(
					function(path) {
						path.dirname = name;
						path.basename = nameMap[path.extname] || path.basename;
					}
				))
				.pipe(gulp.dest('test/'));
});

gulp.task(
	'wrap-liferay',
	function() {
		return gulp.src('src/*.js')
		.pipe(
			plugins.indent(
				{
					tabs: true,
					amount: 1
				}
			)
		)
		.pipe(
			plugins.wrap(
				{ src: 'assets/templates/wrapper.js' },
				{ globalVar: 'AUI.$' }
			)
		)
		.pipe(gulp.dest('build/liferay/'));
	}
);

gulp.task(
	'wrap-jquery',
	function() {
		return gulp.src('src/*.js')
		.pipe(
			plugins.indent(
				{
					tabs: true,
					amount: 1
				}
			)
		)
		.pipe(
			plugins.wrap(
				{ src: 'assets/templates/wrapper.js' },
				{ globalVar: 'jQuery' }
			)
		)
		.pipe(gulp.dest('build/jquery/'));
	}
);

gulp.task('mocha', function () {
		return gulp.src('test/**/index.html').pipe(plugins.mochaPhantomjs({reporter: 'tap'}));
});

gulp.task('lint', function () {
	return gulp.src(paths.lint)
		.pipe(plugins.jshint('.jshintrc'))
		.pipe(plugins.plumber(plumberConf))
		// .pipe(plugins.jscs())
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
	gulp.src(paths.source)
		.pipe(plugins.istanbul()) // Covering files
		.on('finish', function () {
			gulp.src(paths.tests)
				.pipe(plugins.plumber(plumberConf))
				.pipe(plugins.mocha())
				.pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
				.on('finish', function() {
					process.chdir(__dirname);
					cb();
				});
		});
});

gulp.task('bump', ['test'], function () {
	var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

	return gulp.src(['./package.json'])
		.pipe(plugins.bump({ type: bumpType }))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', ['test'], function () {
	gulp.watch(paths.watch, ['test']);
});

// gulp.task('test', ['mocha', 'lint', 'istanbul']);
gulp.task('test', ['mocha']);

gulp.task('build', ['wrap-liferay', 'wrap-jquery']);

gulp.task('release', ['bump']);

gulp.task('default', ['test']);
