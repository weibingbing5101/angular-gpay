import template from './breadNav.html';
import controller from './breadNav.ctrl';
import './breadNav.less';

let Component = {
  restrict: 'E',
  bindings: {
  	navItems: '='
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;
