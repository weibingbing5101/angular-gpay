/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './component';
// import Servie from './service';

let Module = angular.module('homeVM', [
		uiRouter
	])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('homePage', {
			url: '/home',
			template: '<homehtml></homehtml>'
		});
		$stateProvider.state('defaultPage', {
			url: '',
			template: '<homehtml></homehtml>'
		});
		$stateProvider.state('indexPage', {
			url: '/',
			template: '<homehtml></homehtml>'
		});
	})
	.component('homehtml', Component)
	// .service('homeService', Servie);

export default Module;