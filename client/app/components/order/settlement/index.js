import settlementComponent from './component';
export default angular.module('ordersettlement', []) // 1、module组件名  其它组件引入时的名字
	.config(($stateProvider) => { //路由配置
		"ngInject";
		$stateProvider.state('ordersettlement', { // 无实际意义 只做key值使用
			url: '/order/settlement', // 路由参数      router
			template: '<ordersettlement></ordersettlement>' // 路由下显示的  html   标签
		});
	})
	.component('ordersettlement', settlementComponent) // 与 标签名 相同
	//.filter('bankAdd', function() {
	//	return function(data) {
	//		let result = ''
	//		console.log(data);
	//		// 上海浦东发展银行股份有限公司北京分行
	//
	//
	//
	//		return result;
	//	}
	//})
	.filter('bankcardNO', function() {
		return function(data) {
			let result = '';
			let arr = data.split(''); // 产生新数组
			arr.splice(4, arr.length - 8, ' **** ');
			// arr.splice(8, 4, ' **** '); // 操作原数组
			// arr.splice(4, 0, ' ');
			// arr.splice(14, 0, ' ');
			// arr.splice(19, 0, ' ');
			result = arr.join(''); // 产生新字符串
			return result;
		}
	});

// 此index.js主要 配置组件