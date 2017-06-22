/**
 * @desc 组件入口
*/
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Component from './popwindow.comp';

let Module = angular.module('../common/windowpopwindow', [])
.component('gyPopwindow', Component);

export default Module;