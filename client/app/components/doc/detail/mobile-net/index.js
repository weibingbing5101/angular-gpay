/**
 * @desc 组件入口
 */
import Component from './index.comp';

let Module = angular.module('docDetailNet', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('docDetailNet', {
			url: '/doc/detail/net',
			template: '<doc-detail-net></doc-detail-net>'
		});
	})
	.component('docDetailNet', Component);

export default Module;