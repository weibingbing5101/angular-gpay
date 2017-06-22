import template from './tree.html';
import controller from './tree.ctrl';
import './tree.less';

let Component = {
	restrict: 'E',
	bindings: {
		'nodes': '='
	},
	template,
	controller,
	controllerAs: 'vm',
	replace: true
};

export default Component;