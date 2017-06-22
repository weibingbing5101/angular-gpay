/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';


let Module = angular.module('appDesc', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('appDesc', {
    url: '/app/desc',
    template: '<app-desc></app-desc>',
    resolve: {
      loadComponent: ($q, $ocLazyLoad) => {
      	return $q((resolve) => {
        	require.ensure([], () => {
            	let module = require('./appdesc.comp');
            	$ocLazyLoad.load({name: 'appDesc'});
            	resolve(module.controller);
        	}, 'app');
      	});
      }
    }
  });
})

export default Module;