/**
 * 文档中心总入口
 * @author 刘炳礼
 */

import guide from './guide';	// 接入引导
import detail from './detail';	// 文档详情


export default angular.module('doc', [
	guide.name,
	detail.name
]);