/**
 * author liubingli
 * 应用相关接口
 * 
 */
export default class resetpwSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };
    // 首页 ==> 根据账户判断是否需要验证码
    isNeedIndent(params) {
        return this.Api.post('isNeedCode', params);
    };

    // 首页 ==>  登录
    login(params) {
        return this.Api.post('login', params);
    };
    // 首页 ==> 获取验证码
    getIndent(params) {
        return this.Api.getUrlCode('code', params);
    };
    // 首页 ==> 退出登录
    logout(params) {
        return this.Api.post('logout', params);
    };
    // 首页 ==> 忘记密码点击前  检查账号状态
    checkAccountStatus(params) {
        return this.Api.post('checkBeforePwdClick', params);
    };
}
