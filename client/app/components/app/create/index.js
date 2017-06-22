/**
 * @desc 组件入口
*/

let Module = angular.module('appCreate', [])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('appCreate', {
    url: '/app/create',
    template: '<app-create></app-create>',
    resolve: {
      loadComponent: ($q, $ocLazyLoad, $rootScope) => {
        return $q((resolve) => {
          require.ensure([], () => {
            let module = require('./component');
            $ocLazyLoad.load({name: 'appCreate'});
            resolve(module.controller);
          }, 'app');
        });
      }
    }
  });
})

export default Module;