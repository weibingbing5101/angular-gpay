/**
 * @desc 组件入口
 */
import Component from './index.comp';

let Module = angular.module('helpFee', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('helpFee', {
			url: '/help/fee',
			template: '<help-fee></help-fee>'
		});
	})
	.component('helpFee', Component);

export default Module;