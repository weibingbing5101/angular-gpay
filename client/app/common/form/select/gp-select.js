/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './gp-select.comp';

let Module = angular.module('gpSelect', [
  uiRouter
])
.component('gpSelect', Component);

export default Module;