import template from './gp-select.html';
import controller from './gp-select.ctrl';
import './gp-select.less';

let Component = {
  restrict: 'E',
  bindings: {
  	'placehoder': '=',
  	'options': '=',
  	'className': '=',
  	'model': '=' 
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;
