/**
 * @desc 组件入口
*/
import Component from './component';


let Module = angular.module('orderadd', [])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('orderAdd', {
    url: '/order/add',
    template: '<orderadd></orderadd>'
  });
})
.component('orderadd', Component)

export default Module;