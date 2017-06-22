import template from './popwindow.html';
import controller from './popwindow.ctrl';
import './popwindow.less';

let Component = {
	restrict: 'E',
	bindings: {
		text: '=?text',
		confirm: '=?confirm',
		cancel: '=?cancel',
		canceltext: '=?canceltext',
		confirmtext: '=?confirmtext'
	},
	template,
	controller,
	controllerAs: 'vm'
};

export default Component;