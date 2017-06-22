import template from './alert.html';
import controller from './alert.ctrl';
import './alert.less';

let Component = {
	restrict: 'E',
	bindings: {
		gytitlel:'=?gytitlel',		
		gycontext: '=?gycontext',
		gybuttontext: '=?gybuttontext',
		gyisshow: '=?gyisshow',
		gyclickfn:'=?gyclickfn'
	},
	template,
	controller,
	controllerAs: 'vm'
};

export default Component;