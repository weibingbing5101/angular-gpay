import template from './select.html';
import controller from './select.ctrl';
import './select.less';

let Component = {
	restrict: 'E',
	bindings: {
		gyreturnval: '=?gyreturnval',
		gyseldata:'=?gyseldata'
	},
	template,
	controller,
	controllerAs: 'vm'
};

export default Component;