/**
 * @desc 组件入口
 */
import Component from './index.comp';
let Module = angular.module('docGuide', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('docGuide', {
			url: '/doc/guide',
			template: '<doc-guide></doc-guide>'
		});
	})
	.component('docGuide', Component);

export default Module;