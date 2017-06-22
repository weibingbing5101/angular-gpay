/**
 * 弹窗组件的模块的引入
 * @type {module|angular.Module}
 */
//import modalComponent from './modalComponent/component';

/**
 * 数据服务层
 */
import services from '../services/services.js';

/**
 * 业务
 */
import orderList from './order/list';                       //订单列表
import orderrefund from './order/refund';                   //订单退款
import ordersettlement from './order/settlement';           //订单结算
import password from './password/components.js'; 			//重置密码相关
import appinfor from './app/infor';//应用信息

import home from './home';									//首页		
import appCreate from './app/create';                       //创建应用
import appDesc from './app/desc/appdesc';
import sheetDownload from './sheet/download/sheetdownload';                 //报表下载
import businesshome from './business/businesshome/businesshome';

import low from './low/low';

import doc from './doc';
import help from './help';
import experiencecenter from './experience/center/experiencecenter';

import mine from './mine';

export default  angular.module('app.order', [
    //modalComponent.name,
    services.name,
    orderList.name,
    orderrefund.name,
    ordersettlement.name,
    password.name,
    appinfor.name,

    appCreate.name,
    home.name,
    sheetDownload.name,
    businesshome.name,
    appDesc.name,
    low.name,
    doc.name,
    help.name,
    experiencecenter.name,


    // 异步加载的模块
    mine.name
]);