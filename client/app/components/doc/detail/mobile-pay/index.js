/**
 * @desc 组件入口
 */
import Component from './index.comp';

let Module = angular.module('docDetailMpay', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('docDetailMpay', {
			url: '/doc/detail/mpay',
			template: '<doc-detail-mpay></doc-detail-mpay>'
		});
		$stateProvider.state('docDetailIndex', {
			url: '/doc/detail/index',
			template: '<doc-detail-mpay></doc-detail-mpay>'
		});
	})
	.component('docDetailMpay', Component);

export default Module;