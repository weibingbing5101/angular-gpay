import path from 'path';
import fs from 'fs';
import lodash from 'lodash';
import GLOBAL_CONFIG from '../config/global';
import generatorFactory from "./generator.factory";

let tplUserConfig = generatorFactory.get();
let commonTplPath = GLOBAL_CONFIG.commonTplPath;

var tplModelConfig = {
  "list": {
    "formName": "filter"
  },
  "form": {
    "formName": "formData"
  }
}

var tplHelper = {
  cap: function(val){
    return val.charAt(0).toUpperCase() + val.slice(1);
  },
  firstToLower: function(val){
    return val.charAt(0).toLowerCase() + val.slice(1);
  },
  pathToCamel: function(path){
    return path.substr(1).split(/\\|\/|A-Z|\-/).map(function(name, index){
      return index===0 ? name : tplHelper.cap(name);
    }).join('');
  },
  pathToStrike: function(path){
    return path
      .replace(/\\|\//g, '-')
      .replace(/([A-Z])/g, function($0, $1){
        return '-'+tplHelper.firstToLower($1);
      })
      .replace(/^\/|\\|\-/, '');
  },
  includeTpl: function(filename, data){
    let filepath = path.join(commonTplPath, filename);
    if(fs.existsSync(filepath)){
      try{
        let content = fs.readFileSync(filepath, 'utf8');
        data = data||{};
        data.helper = tplHelper;
        return lodash.template(content)(data);
      }catch(e){
        console.log(filepath);
        console.log(e);
        return '';
      }
    }
    return '';
  },
  includeClassCons: function(filename, data){
    return tplHelper.includeTpl(filename+'.cons.js', data);
  },
  includeClassFn: function(filename, data){
    return tplHelper.includeTpl(filename+'.fn.js', data);
  },
  buildFormId: function(data){
    return 'form-'+data.key;
  },
  buildFormModel: function(data){
    return 'vm.'+ tplModelConfig[tplUserConfig.type].formName + '.' + data.key;
  },
  toJSON: function(data){
    return JSON.stringify(data, '', 2);
  },
  filterSelectData: function(data){
    var arr = [];
    data.forEach(function(d){
      arr.push({
        key: d.value,
        value: d.name
      })
    });
    return tplHelper.toJSON(arr);
  },
  filterKey: function(data){
    return data.filter(function(d){
      return !!d.key;
    }).map(function(d){
      return d.key;
    })
  },
  getSelectFnName: function(param){
    return param.key+"SelectDataGet";
  },
  selectIsHTTP: function(param){
    return !!(param.templateOptions&&param.templateOptions.options&&param.templateOptions.options.url)
  }
}

export default tplHelper;