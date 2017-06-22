/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './select.comp';

let Module = angular.module('inputselect', [
		uiRouter
	])
	//.config(($stateProvider) => {
	//	"ngInject";
	//	$stateProvider.state('select', {
	//		url: '/select',
	//		template: '<select></select>'
	//	});
	//})
	.component('gySelect', Component);

export default Module;