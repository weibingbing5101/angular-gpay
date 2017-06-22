import './index.less';
import template from './index.html';
import controller from './controller';
import './filter';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default angular
  .module('mineKeyTrade')
  .component('mineKeyTrade', Component)
