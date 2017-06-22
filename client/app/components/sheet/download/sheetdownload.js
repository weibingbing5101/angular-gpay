/**
 * @desc 组件入口
 */
import Component from './sheetdownload.comp';

let Module = angular.module('sheetdownload', [])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('sheetdownload', {
			url: '/sheet/download',
			template: '<sheetdownload></sheetdownload>'
		});
	})
	.component('sheetdownload', Component);

export default Module;