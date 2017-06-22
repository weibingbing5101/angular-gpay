/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './component';
// import Servie from './service';

let Module = angular.module('resetpassword1', [			
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('resetpassword1', {				
    url: '/resetpassword1',							
    template: '<resetpassword1></resetpassword1>'				
  });
})
.component('resetpassword1', Component)					
// .service('registService', Servie);

export default Module;