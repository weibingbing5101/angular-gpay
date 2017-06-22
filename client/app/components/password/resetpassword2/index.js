/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './component';
// import Servie from './service';

let Module = angular.module('resetpassword2', [			
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('resetpassword2', {				
    url: '/resetpassword2',							
    template: '<resetpassword2></resetpassword2>'				
  });
})
.component('resetpassword2', Component)					
// .service('registService', Servie);

export default Module;