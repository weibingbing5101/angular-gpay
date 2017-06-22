var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var gulpSequence = require('gulp-sequence');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revCollector = require('gn-gulp-rev-collector');
var cheerio = require('gn-gulp-cheerio');
var del = require('del');
var minifyCss = require('gulp-clean-css');
var replace = require('gulp-replace');

import globalConfig from '../config/global';

const imageExtName = '*.{png,jpg,jpeg,gif,ico}'

const basePath = globalConfig.basePath;
const destPath = globalConfig.destPath;

const imageSrcPath = path.join(basePath, 'static-pages/**/' + imageExtName);
const htmlSrcPath = path.join(basePath, 'static-pages/**/*.html');
const imageDestPath = path.join(destPath, 'images');
const imageRevPath = path.join(destPath, 'rev/images');
const cssSrcPath = path.join(basePath, 'static-pages/**/*.css');
const cssRevPath = path.join(destPath, 'rev/css');
const cssDestPath = path.join(destPath, 'css');

gulp.task('static-move', ['clean'], function(cb) {
    gulpSequence(
        'static-images-move',
        'static-css-img-add-dir',
        'static-css-img-replace',
        'static-html-move',
        'static-rev-clean',
        cb
    )
});

// 图片部分
gulp.task('static-images-move', function() {
    return gulp.src(imageSrcPath)
        .pipe(rename((pathObj) => {
            addDirPath(pathObj);
        }))
        .pipe(rev()) //- 文件名加MD5后缀

    // 把图片的名字重命名为不包含文件结构的纯md5形式
    .pipe(rename(function(pathObj) {
            var name = pathObj.basename;
            pathObj.basename = 'static-img' + name.substr(name.lastIndexOf('-'));
        }))
        .pipe(gulp.dest(imageDestPath)) //- 输出文件本地


    .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(imageRevPath));


});

gulp.task('static-css-img-add-dir',function(){
	var preName = '';
	return gulp.src(cssSrcPath)
        .pipe(rename((pathObj) => {
            preName = pathObj.dirname;
            addDirPath(pathObj);
        }))
        .pipe(rev())
        .pipe(rename(function(pathObj) {
            var name = pathObj.basename;

            // console.log(pathObj);
            /*
            { 
                dirname: '.',
                basename: 'mobile-css-main-55bf54ba18',
                extname: '.css' 
            }
            */

            // console.log(name);  // mobile-css-main-55bf54ba18

            pathObj.basename = 'static-css' + name.substr(name.lastIndexOf('-'));

            // console.log(pathObj.basename);   //static-css-55bf54ba18
        }))
        .pipe(minifyCss())
		.pipe(rename(function(pathObj){
			pathObj.dirname = '.';
		}))
		.pipe(replace(/[a-zA-Z-_]+(\.png){1}/g,function(file){
			// console.log(file);
			file = preName.substr(0,preName.lastIndexOf('/'))+'-'+file;
			return file;
		}))
		.pipe(gulp.dest(cssDestPath))

	    .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(cssRevPath));
});

gulp.task('static-css-img-replace',function(){
	var srcPath = [
        path.join(imageRevPath, 'rev-manifest.json'),
        path.join(cssDestPath, '*.css'),
    ];
    return gulp.src(srcPath)
    	.pipe(revCollector())
    	.pipe(gulp.dest(cssDestPath));

});

gulp.task('static-html-move', function() {
    var srcPath = [
        path.join(imageRevPath, 'rev-manifest.json'),
        path.join(cssRevPath, 'rev-manifest.json'),
        path.join(htmlSrcPath)
    ]


    return gulp.src(srcPath) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(cheerio({
            run: function($, file) {
                var htmlPath = file.path;
                if (path.extname(htmlPath) === '.html') {
                    $('img').each(function(index, image) {
                        var src = $(image).attr('src');

                        var replaceSrc = path.join(htmlPath, '../' + src).match(/static\-pages\/(.+)/);

                        if (replaceSrc && replaceSrc.length >= 2) {
                            replaceSrc = replaceSrc[1].split('/');
                            if (replaceSrc.length) {
                                src = replaceSrc.filter(function(name) {
                                    return name !== 'images';
                                }).join('-');

                                if (src) {
                                    $(image).attr('src', './images/' + src);
                                }
                            }
                        }
                    });
                    $('link').each(function(index, css) {
                        var src = $(css).attr('href');

                        var replaceSrc = path.join(htmlPath, '../' + src).match(/static\-pages\/(.+)/);

                        if (replaceSrc && replaceSrc.length >= 2) {
                            replaceSrc = replaceSrc[1].split('/');
                            if (replaceSrc.length) {
                                src = replaceSrc.join('-');

                                if (src) {
                                    $(css).attr('href', 'css/' + src);
                                }
                            }
                        }
                    });
                }

            },
            decodeEntities: false,
        }))
        .pipe(revCollector()) //- 执行文件内css名的替换
        .pipe(rename(function(pathObj) {
            addDirPath(pathObj);
        }))
        .pipe(gulp.dest(destPath)); //- 替换后的文件输出的目录
});

















gulp.task('static-images-rename', function() {
    return gulp.src(path.join(imageDestPath, imageExtName))
        .pipe(rename(function(pathObj) {
            var name = pathObj.basename;
            pathObj.basename = 'static-img' + name.substr(name.lastIndexOf('-'));
        }))
        .pipe(gulp.dest(imageDestPath));
});



gulp.task('static-rev-clean', function(cb) {
    return del(path.join(destPath, 'rev'), cb);
});


//css部分
gulp.task('static-css-minify', function(cb) {

    gulp.src(cssSrcPath)
        .pipe(rename((pathObj) => {
            pathObj.dirname = '.';
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(cssDestPath));

});


function addDirPath(pathObj, sep) {
    var originName = pathObj.basename;

    sep = sep || '-';

    if (pathObj.dirname !== '.') {
        var dirPrefix = pathObj.dirname.replace(path.sep + 'images', '').split(/[\/|\\]/).join(sep);
        if (dirPrefix) {
            dirPrefix += sep;
        }
        var newName = dirPrefix + pathObj.basename

        pathObj.dirname = '.';
        pathObj.basename = dirPrefix + pathObj.basename;
        // console.log(pathObj.basename);

    }
};
