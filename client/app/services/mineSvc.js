/**
 * author liubingli
 * 应用相关接口
 * 充值密码相关接口
 */
export default class resetpwSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    /**
     * 创建应用
     * @param params
     * @returns {*}
     */

    // 我的  ==> 获取账户总览
    getMineTotalData(params) {
        return this.Api.post('accountView', params);
    };
    // 我的  ==> 获取基本信息
    getMineInforData(params) {
        return this.Api.post('queryBasicInfo', params);
    };
    // 我的  ==> 修改密码
    mineRestSetPWD(params) {
        return this.Api.post('modifyPwd', params);
    };


    // 未登录 修改密码相关  ==> 发送邮箱验证码
    sendIndentNUM(params) {
        return this.Api.post('sendEmail', params);
    };
    // 未登录 修改密码相关  ==> 重置密码   params = {token,email,pwd}
    restSetPWD(params) {
        return this.Api.post('resetPwd', params);
    };
    // 帐号激活
    accountActivate(params) {
        return this.Api.post('accountActivation', params);
    };

    // 判断帐号是否激活
    checkAccountActivate(params) {
        return this.Api.post('checkAccountIsActivation', params);
    };
    // resetpassword2 重置密码第二部 检查链接
    checkResetPasswordLink(params) {
        return this.Api.post('checkPwdLink', params);
    };
    queryMD(params){
        return this.Api.post('queryTradeKey',params);
    }
    querySRA(params){
        return this.Api.post('queryCurrentNotifyKey',params);
    }
    queryNotifyKeyRecord(params){
        return this.Api.post('queryNotifyKeyRecord',params);
    }
    saveTradeKey(params){
        return this.Api.post('saveTradeKey',params);
    }
    updateTradeKey(params){
        return this.Api.post('updateTradeKey',params);
    }


}
