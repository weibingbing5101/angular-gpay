/**
 * author liubingli
 * 应用相关接口
 * 充值密码相关接口
 */
export default class appTypeSvc {
  constructor(Api){
    'ngInject';
    this.Api = Api;
  }

  /**
   * 创建应用
   * @param params
   * @returns {*}
   */
   
  getAppType(params){ // 自定义服务名
    return this.Api.post('queryAppType',params);  // 要与接口名相对
  }
  
}