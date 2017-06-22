/**
 * author liubingli
 * 应用相关接口
 */
export default class appSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    };

    /**
     * 创建应用
     * @param params
     * @returns {*}
     */

    // 创建应用
    add(params) {
        return this.Api.post('app/add', params);
    };

    // 应用信息查询
    getAppInfor(params) {
        return this.Api.post('querySpecifiedApp', params);
    };
    // 应用信息  名字更改
    editAppName(params) {
        return this.Api.post('modifyAppName', params);
    };
    // 删除应用
    disableApp(params) {
        return this.Api.post('disableApp', params);
    };

    // 应用状态查询
    queryAppIsFrozen(params){
        return this.Api.post('queryAppIsFrozen', params); 
    };
};
