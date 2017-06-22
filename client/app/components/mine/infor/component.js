import template from './index.html';
import controller from './controller';
import './index.less';

let Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};


export default angular
  .module('mineInfo')
	.component('mineInfo', Component)
	.filter('userType', function() { // 支付渠道
    return function(userType) {
      return ['管理员','普通用户'][userType];
    }
	})