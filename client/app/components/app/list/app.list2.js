/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './app.list2.comp';

let Module = angular.module('componentsapp.list2', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('app.list2', {
    url: '/app.list2',
    template: '<app.list2></app.list2>'
  });
})
.component('app.list2', Component);

export default Module;