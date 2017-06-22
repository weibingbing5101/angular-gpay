import yargs    from 'yargs';
import inquirer from 'inquirer';
import path from 'path';

import globalConfig from '../config/global';
const basePath = globalConfig.basePath;

let questions = [];

function addInputQuestion(arg){
	var data = {
    type: "input",
    name: arg.name,
    message: "输入"+arg.message
  }
  if(arg.validate){
  	data.validate = arg.validate;
  }
  questions.push(data);
}

var questionsAdd = {
	type: function(){
		questions.push({
      type: "list",
      name: "type",
      message: "请选择模板类型",
      choices: [
        'list',
      	'blank',
      	'form'
      ]
    })
	},
	dirname: function(){
		addInputQuestion({
			name: 'dirname',
			message: '文件夹名',
			validate: function(value) {
        var valid = value!==null&&value!==undefined&&value!=='';
        return valid || "文件夹名不能为空";
      }
		})
	},
	appname: function(){
		addInputQuestion({
			name: 'appname',
			message: '文件名'
		})
	},
	parentname: function(){
		addInputQuestion({
			name: 'parentname',
			message: '父路径名'
		})
	},
  config: function(){
    addInputQuestion({
      name: 'config',
      message: '配置文件地址'
    })
  }
};

function objectEach(obj, cb){
	Object.keys(obj).forEach(function(key){
		cb(key, obj[key]);
	});
}

/*validate: function(value) {
  var valid = value!==null&&value!==undefined;
  return valid || "目录名不能为空";
}*/
// 文件夹名字 文件名 文件类型 父路径
export default function(cb){
	questions = [];
	
  let setData = {
  	dirname: yargs.argv.dirname,
	  parentname: yargs.argv.parent,
	  type: yargs.argv.type,
	  appname: yargs.argv.appname,
    config: yargs.argv.config
  }
  
  objectEach(setData, function(key, value){
  	if(!value){
  		questionsAdd[key]();
  	}
  });


  function sendSet(){
  	var result = {
  		"status": 200,
  		"message": "ok"
  	}

  	if(!setData.dirname){
  		result.status = 500
  		result.message = '文件夹名不能为空';
  	}else{
  		if(!setData.appname){
  			setData.appname = setData.dirname;
  		}
  		if(!setData.type){
  			setData.type = 'blank';
  		}

  		let parentPath;
  		if(!setData.parentname){
  			parentPath = 'components';
  		}else{
  			/*let curParentPath = path.join(basePath, 'components');
  			
  			let parenNames = setData.parentname.split('/');
  			parenNames.forEach(function(name){
  				curParentPath = path.join(curParentPath, name);
  				if(fs.existsSync(curParentPath)){
  					fs.createDirSync(curParentPath);
  				}
  			});*/
  			parentPath = path.join('components', setData.parentname);
  		}

  		setData.destPath = path.join(basePath, parentPath, setData.dirname);


  		cb&&cb(setData);
  	}


  }

  if(questions.length){

  	var a = inquirer.prompt(questions).then(function(answers, err) {

      objectEach(answers, function(key, value){
        if(value){
          setData[key] = value;
        }
      });

      sendSet();

    });
  }else{
  	sendSet();
  }

}  