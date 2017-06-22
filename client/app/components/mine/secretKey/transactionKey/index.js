/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';

let Module = angular.module('mineKeyTrade', [
  uiRouter
])													
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('mineKeyTrade', {  	
    url: '/mine/secretKey/transcationKey',						
    template: '<mine-key-trade></mine-key-trade>',
    resolve: {
      loadComponent: ($q, $ocLazyLoad) => {
        return $q((resolve) => {
          require.ensure([], () => {
            let module = require('./component');
            $ocLazyLoad.load({name: 'mineKeyTrade'});
            resolve(module.controller);
          }, 'mine');
        });
      }
    }		
  });
})


export default Module;  