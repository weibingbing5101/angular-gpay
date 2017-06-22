/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './component';
// import Servie from './service';

let Module = angular.module('accountactivate', [			
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('accountactivate', {				
    url: '/accountactivate',							
    template: '<accountactivate></accountactivate>'				
  });
})
.component('accountactivate', Component)					
// .service('registService', Servie);

export default Module;