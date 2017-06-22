import refundComponent from './component';
export default angular.module('orderrefund', []) // 1、module组件名  其它组件引入时的名字
	.config(($stateProvider) => { //路由配置
		"ngInject";
		$stateProvider.state('orderrefund', { // 无实际意义 只做key值使用
			url: '/order/refund', // 路由参数      router
			template: '<orderrefund></orderrefund>' // 路由下显示的  html   标签
		});
	})
	.component('orderrefund', refundComponent) // 与 标签名 相同
	.filter('refundList_RefundStatusText', function() { // 退款状态
		return function(refundStatus) {
			return ['', '处理中', '退款成功'][refundStatus];
		}
	})
	.filter('refundList_refundTypeText',function(){   //退款方式
		return function(refundType){
			return ['原路返回','退款至商户结算卡'][refundType]
		}
	});

// 此index.js主要 配置组件