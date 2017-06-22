/**
 * @desc 组件入口
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './<%= appname %>.comp';

let Module = angular.module('<%= parent %><%= appname %>', [
		uiRouter
	])
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider.state('<%= appname %>', {
			url: '/<%= appname %>',
			template: '<<%= appname %>></<%= appname %>>'
		});
	})
	.component('<%= appname %>', Component);

export default Module;