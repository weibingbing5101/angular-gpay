/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './<%= appname %>.comp';

let <%= camelModuleName  %>Module = angular.module('<%= camelModuleName  %>', [
  uiRouter
])
.config(($stateProvider) => {
  "ngInject";
  $stateProvider.state('<%= camelModuleName  %>', {
    url: '<%= path||router %>',
    template: '<<%= helper.pathToStrike(router)  %>></<%= helper.pathToStrike(router)  %>>'
  });
})
.component('<%= camelModuleName  %>', Component);

export default <%= camelModuleName %>Module;