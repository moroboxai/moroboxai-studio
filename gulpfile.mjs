'use strict'

import * as path from 'path';
import gulp from 'gulp';
import gulpTslint from 'gulp-tslint';
import gulpWebpack from 'webpack-stream';
import tslint from 'tslint';
import * as merge from 'merge2';
const isDev = process.env.NODE_ENV !== 'production';

const typeCheck = tslint.Linter.createProgram('tsconfig.json');

gulp.task('lint', () => merge([
	gulp.src('./src/**/*.ts')
		.pipe(gulpTslint({
			configuration: 'tslint.json',
			formatter: 'prose',
			program: typeCheck
		}))
		.pipe(gulpTslint.report()),
	gulp.src('./app/**/*.ts')
		.pipe(gulpTslint({
			configuration: 'tslint.json',
			formatter: 'prose',
			program: typeCheck
		}))
		.pipe(gulpTslint.report())
]));

gulp.task('build-index', () => {
	return gulp.src('./src/index.ts')
		.pipe(gulpWebpack({
			context: path.resolve('src'),
			entry: './index.ts',
			mode: isDev ? 'development' : 'production',
			target: 'electron-main',
			module: {
				rules: [{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}]
			},
			output: {
				filename: 'index.cjs',
				path: path.resolve("build")
			},
			resolve: {
				extensions: ['.ts', '.js']
			},
			node: {
				__dirname: false,
				__filename: false
			}
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('build-preload', () => {
	return gulp.src('./src/preload.ts')
		.pipe(gulpWebpack({
			context: path.resolve('src'),
			entry: './preload.ts',
			mode: isDev ? 'development' : 'production',
			target: 'electron-preload',
			module: {
				rules: [{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				}]
			},
			output: {
				filename: 'preload.cjs',
				path: path.resolve("build")
			},
			resolve: {
				extensions: ['.ts', '.js']
			},
			node: {
				__dirname: false,
				__filename: false
			}
		}))
		.pipe(gulp.dest('build'));
});

gulp.task('copy-icon', () => {
	return gulp.src('./src/icon.svg')
		.pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series('build-preload', 'build-index', 'copy-icon'));