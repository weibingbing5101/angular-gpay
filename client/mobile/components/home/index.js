/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './component';

let Module = angular.module('app.components.home', [
		uiRouter
	])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('homePage', {
			url: '/home',
			template: '<home></home>'
		});
		$stateProvider.state('defaultPage', {
			url: '',
			template: '<home></home>'
		});
		$stateProvider.state('indexPage', {
			url: '/',
			template: '<home></home>'
		});
	})
	.component('home', Component)

export default Module;