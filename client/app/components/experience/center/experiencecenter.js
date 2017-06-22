/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './experiencecenter.comp';

let Module = angular.module('experience/experiencecenter', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('experiencecenter', {
    url: '/experience/center',
    template: '<experiencecenter></experiencecenter>'
  });
})
.component('experiencecenter', Component);

export default Module;