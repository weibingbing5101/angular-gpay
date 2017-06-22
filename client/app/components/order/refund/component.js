import template from './index.html';  // 引入html模板
import controller from './controller';	//引入controller 对象
import './index.less';					//引入 less样式

let refundComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default refundComponent;
