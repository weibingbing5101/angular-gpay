/**
 * @desc 组件入口
*/
import Component from './breadNav.comp';
import NavConfigFactory from './nav.config.factory';

let Module = angular.module('breadnav', [
])
.factory('navConfigFactory', NavConfigFactory)
.component('breadNav', Component);

export default Module;