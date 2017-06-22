import template from './<%= appname %>.html';
import controller from './<%= appname %>.ctrl';
import './<%= appname %>.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default Component;