/**
 * @desc 我的账户-密钥管理-通知密钥
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';

let Module = angular.module('mineKeyNotify', [
  uiRouter
])													
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('mineKeyNotify', { 
    url: '/mine/secretKey/notifyKey',
    template: '<mine-key-notify></mine-key-notify>',
    resolve: {
      loadComponent: ($q, $ocLazyLoad) => {
        return $q((resolve) => {
          require.ensure([], () => {
            let module = require('./component');
            $ocLazyLoad.load({name: 'mineKeyNotify'});
            resolve(module.controller);
          }, 'mine');
        });
      }
    }
  });
})

export default Module;  