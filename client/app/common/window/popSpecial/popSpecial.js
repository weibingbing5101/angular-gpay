/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './popSpecial.comp';

let Module = angular.module('../common/windowpopSpecial', [])
.component('gyPopspecial', Component);

export default Module;