/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './alert.comp';

let Module = angular.module('alert', [
		uiRouter
	])
	.component('gyAlert', Component);

export default Module;