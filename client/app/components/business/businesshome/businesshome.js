/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './businesshome.comp';

let Module = angular.module('business/businesshome', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('businesshome', {
    url: '/business/businesshome',
    template: '<businesshome></businesshome>'
  });
})
.component('businesshome', Component);

export default Module;