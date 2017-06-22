export default angular
  .module('mineKeyTrade')
	.filter('userType', function() { // 支付渠道
	  return function(userType) {
	    return ['管理员','普通用户'][userType];
	  }
	})