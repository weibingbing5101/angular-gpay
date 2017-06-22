/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';


let Module = angular.module('mineTotal', [ 
  uiRouter
])												
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('mineTotal', { 
    url: '/mine/total',								// 路由地址
    template: "<mine-total></mine-total>",		// 模板标签名
    resolve: {
      loadComponent: ($q, $ocLazyLoad) => {
        return $q((resolve) => {

          require.ensure([], () => {
            let module = require('./component');
            $ocLazyLoad.load({name: 'mineTotal'});
            resolve(module.controller);
          }, 'mine');
        });
      }
    }
  });
})

export default Module;  