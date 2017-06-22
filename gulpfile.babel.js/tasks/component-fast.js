import gulp from 'gulp';
import path from 'path';
import fs from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import { basePath, commonTplPath } from './config/global';

gulp.task('p-fast', function(){
  try{
    let allTplSetPath = path.join(commonTplPath, 'all.json');
    let allTplSetData = fs.readFileSync(allTplSetPath, 'utf8');
    allTplSetData = JSON.parse(allTplSetData);
    let buildName = yargs.argv.name;

    if(buildName&&allTplSetData[buildName]){

    }
    

  }catch(e){
    console.log('存储模板设置出错：');
    console.log(e)
  }
});