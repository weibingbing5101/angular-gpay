import template from './appdesc.html';
import controller from './appdesc.ctrl';
import './appdesc.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default angular
  .module('appDesc')
  .component('appDesc', Component)
