import template from './calendarLink.html';
import controller from './calendarLink.ctrl';
import './calendarLink.less';

let Component = {
  	restrict: 'E',
  	bindings: {
  		gygetstartdate:'=?gygetstartdate',
  		gygetenddate:'=?gygetenddate',
  		gyreturnstartdate:'=?gyreturnstartdate',
  		gyreturnenddate:'=?gyreturnenddate'
  	},
  	template,
  	controller,
  	controllerAs: 'vm',
  	link: function (scope, element, attrs) {
      scope.$watch('gygetstartdate', function(val){
        scope.vm.setCalendarValue();
      })
    }
};

export default Component;
