/**
 * @desc 我的账户-密码修改
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';

let Module = angular.module('mineEditpwd', [
  uiRouter
])													
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('mineEditpwd', {
    url: '/mine/editpwd',								// 路由地址
    template: '<mine-editpwd></mine-editpwd>',		// 模板标签名
    resolve: {
      loadComponent: ($q, $ocLazyLoad) => {
        return $q((resolve) => {
          require.ensure([], () => {
            let module = require('./component');
            $ocLazyLoad.load({name: 'mineEditpwd'});
            resolve(module.controller);
          }, 'mine');
        });
      }
    }
  });
})

export default Module;  