'use strict';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import webpack from 'webpack';
import devConfig from './config/webpack.dev';
import packConfig from './config/webpack.pack';
import mainConfig from './config/webpack.main';

import runSequence from 'run-sequence';
let devCompiler = null;
const env = gulp.env;
gulp.task('webpack-watch', (done)=> {
    var finished = false;
    // run webpack --watch
    devCompiler.watch({
        aggregateTimeout: 300
    }, (err, stats)=> {
        if(err) {
            errorHandler('webpack-watch', err);
        }
        gutil.log('[webpack-build-watch]',stats.toString({
            colors: true,
            chunks: false
        }));

        if (!finished) {
            done();
            finished = true;
        }
    });
});
gulp.task('webpack', (done)=> {
	devCompiler.run(function(err, stats) {
        if (err) {
            errorHandler('webpack-build-dev', err);
        }
        done();
    });
});
//这里需要优化
gulp.task('server', (done)=> {
    var server = require('gulp-server-livereload');
    var host = 'localhost';
    var flag = true;
    var serverConfig = {
        // livereload: {
        //     enable: true,
        //     filter: (fileName, callback)=> {
        //         if (flag) {
        //             flag = false;
        //             setTimeout(()=> {
        //                 callback(!/\.svn/.test(fileName) && !/\.map$/.test(fileName) ||
        //                     (/\\assets\\/.test(fileName) || /\.html$/.test(fileName)));
        //                 flag = true;
        //             }, 800);
        //         }
        //
        //     },
        //     port:  37777
        // },
        // livereload: true,
        // directoryListing: true,
        defaultFile:"/main-dev.html",
        open: false,
        port: 8000,
        host:  host
    };
    gulp.src('./src')
        .pipe(server(serverConfig));
});
// 错误处理函数
function errorHandler(src, e) {
    // 控制台发生，错误时beep一下
    gutil.beep();
    if (src) {
        throw new gutil.PluginError(src, e);
    } else {
        gutil.log(src, e);
    }
}
gulp.task('default', function () {
	gutil.log('please input /gulp dev/ or /gulp pack/');
});
gulp.task('main',() => {
  devCompiler = webpack(mainConfig);
  runSequence('webpack');
})


gulp.task('dev',() => {
  devCompiler = webpack(devConfig);
  runSequence('webpack-watch' , 'webpack' , 'server');
})
gulp.task('pack',()=> {
  devCompiler = webpack(packConfig);
  runSequence('webpack');
})
