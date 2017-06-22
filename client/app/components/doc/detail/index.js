/**
 * 文档中心详情总入口
 * @author 刘炳礼
 */

import mobilePay from './mobile-pay';	// 移动支付
import mobileNet from './mobile-net';


export default angular.module('doc.detail', [
	mobilePay.name,
	mobileNet.name
]);