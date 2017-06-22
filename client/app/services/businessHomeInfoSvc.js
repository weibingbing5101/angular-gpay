/**
 * author liubingli
 * 应用相关接口
 * 充值密码相关接口
 */
export default class businessHomeInfoSvc {
  constructor(Api){
    'ngInject';
    this.Api = Api;
  }

  /**
   * 创建应用
   * @param params
   * @returns {*}
   */
   
  getAllAppInfo(params){ // 自定义服务名
    return this.Api.post('merchantAppInfo',params);  // 要与接口名相对
  }
  queryAppIsFrozen(params){
    return this.Api.post('queryAppIsFrozen',params);
  }
}