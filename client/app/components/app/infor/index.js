/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './component';
// import Servie from './service';

let Module = angular.module('appinforVM', [ 		//NG的模块名 与以下无关
  uiRouter
])													// 与controller.js里的name无关系
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('app-infor', {  		// 无实际意义
    url: '/app/infor',								// 路由地址
    template: '<appinforhtml></appinforhtml>'		// 模板标签名
  });
})
.component('appinforhtml', Component)				// 实现NG组件化 与上面的模板同名
// .service('inforService', Servie);

export default Module;  