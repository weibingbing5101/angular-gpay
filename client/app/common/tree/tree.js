import Component from './tree.comp';
import angularUiTree from 'angular-ui-tree';
import Factory from './tree.factory';
import TreeConfigFactory from './tree.config.factory';
//import 'angular-animate'
//import $ from 'jquery';

let Module = angular.module('gpTree', [
		'ui.tree'
	])
	.factory('treeFactory', Factory)
	.factory('treeConfigFactory', TreeConfigFactory)
	.component('gpTree', Component);

export default Module;