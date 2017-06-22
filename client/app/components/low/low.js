/**
 * @desc 组件入口
 */
import Component from './low.comp';

let Module = angular.module('low', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('low', {
			url: '/low',
			template: '<low></low>'
		});
	})
	.component('low', Component);

export default Module;