import template from './index.html';
import controller from './index.ctrl';
import './index.less';

let Component = {
  restrict: 'E',
  bindings: {
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;
