/**
 * @desc 我得账户-基本信息
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';

let Module = angular.module('mineInfo', [ 
  uiRouter
])													
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('mineInfo', {
    url: '/mine/infor',								// 路由地址
    template: '<mine-info></mine-info>',		// 模板标签名
    resolve: {
      loadComponent: ($q, $ocLazyLoad) => {
        return $q((resolve) => {
          require.ensure([], () => {
            let module = require('./component');
            $ocLazyLoad.load({name: 'mineInfo'});
            resolve(module.controller);
          }, 'mine');
        });
      }
    }
  });
})

export default Module;  