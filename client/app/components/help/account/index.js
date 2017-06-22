/**
 * @desc 组件入口
 */
import Component from './index.comp';

let Module = angular.module('helpAccount', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('helpAccount', {
			url: '/help/account',
			template: '<help-account></help-account>'
		});
	})
	.component('helpAccount', Component);

export default Module;