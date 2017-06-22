/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './tips.comp';

let Module = angular.module('tips', [
		uiRouter
	])
	//.config(($stateProvider) => {
	//	"ngInject";
	//	$stateProvider.state('select', {
	//		url: '/select',
	//		template: '<select></select>'
	//	});
	//})
	.component('gyTips', Component);

export default Module;