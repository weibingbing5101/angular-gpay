const STATUS_ENUM = {
  1: {
    text: "可用",
    color: '#666'
  },
  2: {
    text: "失效",
    color: '#666'
  }
}

export default angular
  .module('mineKeyNotify')
	.filter('userType', function() { // 支付渠道
	    return function(userType) {
	      return ['管理员','普通用户'][userType];
	    }
	  })
	.filter('StatusText',['$sce', function($sce){
	  return function(status){
	    var statusObj = STATUS_ENUM[status];
	    return $sce.trustAsHtml(statusObj ? '<span style="color:'+statusObj.color+'">'+statusObj.text+'</span>' : '');
	  }
	}])