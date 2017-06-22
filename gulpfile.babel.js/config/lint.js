/**
 * @file js任务用到的配置
 */
import path from 'path';
import fs from 'fs';
var parseJson = require('parse-json');


import globalConfig from './global';
const basePath = globalConfig.basePath;

/*var rules = fs.readFileSync(path.join(__dirname, 'lint.rules.json'), 'utf8' );
rules = rules.replace(/\/\/.*\n/g, '')
rules = JSON.parse(rules);*/

var config = {
  src:  [
    // 检查除测试用例以外的所有js
    path.join(basePath, '**/*.js'),
    //path.join(basePath, 'components/order/list/index.js'),
    '!**/*.spec.js'
  ],
  "rules": {}   // 官方推荐的
  // "rules": rules // 自义定配置 
};

module.exports = config;



//var jsp =require("uglify-js").parser;
//var pro =require("uglify-js").uglify;
//var ast = jsp.parse(orig_code);// 解析代码返回初始的AST
//ast = pro.ast_mangle(ast);// 获取变量名称打乱的AST
//a = pro.ast_squeeze(a);// 获取经过压缩优化的ASTvar final_code = pro.gen_code(ast);// 压缩后的代码