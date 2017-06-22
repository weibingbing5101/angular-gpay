/**
 * 我的
 */
'use strict';
import total from './total'; 			//我的总览
import infor from './infor'; 			//我的基本信息
import editpwd from './editpwd'; 	
import transactionKey from './secretKey/transactionKey';  	//我的修改密码
import notifyKey from './secretKey/notifyKey'; 

export default angular.module('mine', [
	total.name,
	editpwd.name,
	infor.name,
	transactionKey.name,
	notifyKey.name
])