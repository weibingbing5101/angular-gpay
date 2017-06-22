/**
 * @desc 组件入口
 */
import Component from './index.comp';

let Module = angular.module('helpRefund', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('helpRefund', {
			url: '/help/refund',
			template: '<help-refund></help-refund>'
		});
	})
	.component('helpRefund', Component);

export default Module;