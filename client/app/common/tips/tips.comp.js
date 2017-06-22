import template from './tips.html';
import controller from './tips.ctrl';
import './tips.less';

let Component = {
	restrict: 'E',
	bindings: {
		gydisval: '=?gydisval'
	},
	template,
	controller,
	controllerAs: 'vm'
};

export default Component;