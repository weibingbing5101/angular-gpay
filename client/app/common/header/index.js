/**
 * @desc 果仁支付头部
*/
import angular from 'angular';
import Component from './component';
import PathConfigFactory from './path.config.factory';

let Module = angular.module('commonheader', [
])
.factory('pathConfigFactory', PathConfigFactory)
.component('commonheader', Component);

export default Module;