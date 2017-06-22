import api from './api';                   //这个以后要写成 node_module
import commonSvc from './commonSvc';       //基础服务
import enumSvc from './enumSvc';           //枚举服务
import appSvc from './appSvc';           //礼品服务
import appTypeSvc from './appTypeSvc';
import appCreateSvc from './appCreateSvc';
import businessHomeInfoSvc from './businessHomeInfoSvc';
import appBasicSvc from './appBasicSvc';
import sheetDownloadSvc from "./sheetDownloadSvc";


import mineSvc from './mineSvc';            // 我的相关服务  
import orderSvc from './orderSvc';           //定单列表
import homeSvc from './homeSvc';           //首页相关


export default angular
  .module('app.services', [
      api.name
  ])
  .service({
    commonSvc,
    enumSvc,
    appSvc,
    appTypeSvc,
    appCreateSvc,
    businessHomeInfoSvc,
    appBasicSvc,
    sheetDownloadSvc,

    mineSvc,
    orderSvc,
    homeSvc,

  });
