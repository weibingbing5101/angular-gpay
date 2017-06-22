/**
 * 帮助中心总入口
 * @author 刘炳礼
 */

import account from './account';	// 账户问题
import refund from './refund';	// 交易退款
import fee from './fee'; // 产品费率


export default angular.module('help', [
	account.name,
	refund.name,
	fee.name
]);