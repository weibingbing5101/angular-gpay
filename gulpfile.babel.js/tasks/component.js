import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import sync from 'run-sequence';
import rename from 'gulp-rename';
import template from 'gulp-template';
import fs from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import minimist from 'minimist';
import generatorSet from '../tools/generator.set';
import generatorFactory from "../tools/generator.factory";
import tplHelper from '../tools/tpl.helper';
import globalConfig from '../config/global';

const basePath = globalConfig.basePath;
const appPath = globalConfig.appPath;
const rootPath = globalConfig.rootPath;
const buildHelperPath = path.join(rootPath, 'gulpfile.babel.js')

let generatorPath = path.join(buildHelperPath, 'generator');

let templatesPaths = {
  blank: path.join(generatorPath, 'blank/**/*.**'),
  form: path.join(generatorPath, 'form/**/*.**'),
  list: path.join(generatorPath, 'list/**/*.**'),
  common: path.join(generatorPath, 'common/**/*.**')
}

let commonTplPath = path.join(generatorPath, 'common');

let configDirPath = path.join(rootPath, 'generator.conf');

let cacheDirPath = path.join(buildHelperPath, 'cache');

gulp.task('component', () => {

  generatorSet(function(result) {

    try{
      buildComponent(result);
    }catch(e){
      console.log(e)
    }
    
  });

});

gulp.task('p', ['component']);



function buildComponent(result) {



    let type = result.type;
    let dirname = result.dirname;
    let appname = result.appname;
    let destPath = result.destPath;
    let parentname = result.parentname || '';
    let configFile = result.config;
    let moduleName = destPath.substr(destPath.replace(/\\/g, '/').indexOf('components')+10);
    let camelModuleName = tplHelper.pathToCamel(moduleName);
    let strikeModuleName = tplHelper.pathToStrike(moduleName);



    let blankTemplates = templatesPaths[type||'list'];


    generatorFactory.set(result);



    let tplData = {
      dirname: dirname,
      upCaseName: tplHelper.cap(dirname),
      parent: parentname,
      appname: appname,
      upCaseAppname: tplHelper.cap(appname),
      router: moduleName,
      camelModuleName: camelModuleName,
      helper: tplHelper
    } 
    if (configFile) {
      try{
        let configData = fs.readFileSync(path.join(configDirPath, configFile + '.json'), 'utf8');
        configData = JSON.parse(configData);
        lodash.extend(tplData, configData);
      }catch(e){
        console.log('配置文件编译出错');
        console.log(e)
      }
    }

    var apis = parseAPI(tplData);
    tplData.apis = apis;

    let storagePath;
    let storageData;

    try{
      storagePath = path.join(cacheDirPath, 'storage.json');
      storageData = fs.readFileSync(storagePath, 'utf8');
      storageData = JSON.parse(storageData);
    }catch(e){
      console.log('读取缓存出错：');
      console.log(e)
    }


    try{
      storageData.push({
        appname: camelModuleName,
        path: path.join(moduleName, appname).replace(/\\+/g, '/')
      })
      storageData = arrayUnique(storageData);
      fs.writeFileSync(storagePath, JSON.stringify(storageData, '', 2), 'utf8')
    }catch(e){
      console.log('设置缓存出错：');
      console.log(e)
    }
    
    // 存储每个模板的设置
    try{
      let allTplSetPath = path.join(cacheDirPath, 'all.json');
      let allTplSetData = fs.readFileSync(allTplSetPath, 'utf8');

      allTplSetData = JSON.parse(allTplSetData);
      allTplSetData[configFile] = result;
      writeData(allTplSetPath, allTplSetData);

    }catch(e){
      console.log('存储模板设置出错：');
      console.log(e)
    }


    try{
      gulp.src(blankTemplates)
      .pipe(template(tplData))
      .pipe(rename((path) => {
        path.basename = path.basename.replace('index', appname);
      }))
      .pipe(gulp.dest(destPath));
    }catch(e){
      console.log('组件主体文件生成失败')
      console.log(e)
    }
    



    // 组件入口文件
    try{
      gulp.src(path.join(commonTplPath, 'componentEntry.js'))
      .pipe(template({
        data: storageData
      }))
      .pipe(rename((path) => {
        path.basename = 'components';
      }))
      .pipe(gulp.dest(path.join(basePath, 'components')));
    }catch(e){
      console.log('组件入口生成失败')
      console.log(e);
    }
    

    // 组件的私有接口
    try{
      gulp.src(path.join(commonTplPath, 'componentSvc.js'))
      .pipe(template(tplData))
      .pipe(rename((path) => {
        path.basename = path.basename.replace('component', camelModuleName);
      }))
      .pipe(gulp.dest(path.join(basePath, 'services')));
    }catch(e){
      console.log('组件service生成失败')
      console.log(e)
    }
    

    // 把新增加的接口放到在公共文件中引入
    try{
      gulp.src(path.join(commonTplPath, 'entrySvc.js'))
      .pipe(template({
        services: storageData
      }))
      .pipe(rename((path) => {
        path.basename = 'index';
      }))
      .pipe(gulp.dest(path.join(basePath, 'services')));
    }catch(e){
      console.log('service入口生成失败')
      console.log(e)
    }

}


function cap(val){
  return val.charAt(0).toUpperCase() + val.slice(1);
};






function arrayUnique(arr){
  var arrMap = {};
  return arr.filter(function(item){
    if(!arrMap[item.appname]){
      arrMap[item.appname] = true;
      return true
    }
    return false;
  })
}

function parseListButton(content){

}

function parseAPI(configData){
  var apis = [];

  try{
    if(configData.query&&configData.query.url){
      apis.push({
        name: configData.appname||'send',
        url: configData.query.url,
        method: configData.query.method||'get',
        isDefault: true
      })
    }

    if(configData.list){
      var list = configData.list;
      list.forEach(function(item, index){
        if(item.content){
          var btns = item.content;
          btns.forEach(function(btn){
            if(btn.type!=='link'){
              apis.push({
                name: btn.key||'btn'+ tplHelper.cap(btn.type)+index,
                url: btn.url||'',
                params: btn.params||{},
                method: btn.method||'get'
              });
            }
          });
        }
      });
    }

    if(configData.query&&configData.query.params){
      let params = configData.query.params;
      params.forEach(function(param){
        if(param.templateOptions&&param.templateOptions.options&&param.templateOptions.options.url){
          var options = param.templateOptions.options;
          apis.push({
            name: tplHelper.getSelectFnName(param),
            url: options.url||'',
            params: options.params||{},
            method: options.method||'get',
            type: 'select',
            key: param.key
          });
        }
      });
    }

  }catch(e){
    cosole.log('API解析出错')
    console.log(e)
  }
  

  return apis;

}

function writeData(filePath, content){
  fs.writeFileSync(filePath, tplHelper.toJSON(content), 'utf8');
}