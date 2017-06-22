import template from './calendar.html';
import controller from './calendar.ctrl';
import './calendar.less';

let Component = {
  restrict: 'E',
  bindings: {
  	gymodel:'=?gymodel',  //保存时间数据，格式[2016,7,12]
  	gymethod:'=?gymethod' //两个日历联动时使用方法，方法在calendarLink中定义
  },
  template,
  controller,
  controllerAs: 'vm',
  link: function (scope, element, attrs) {
      scope.$watch('gymodel', function(val){
        scope.vm.setInputValue();
      })
    }
};

export default Component;
