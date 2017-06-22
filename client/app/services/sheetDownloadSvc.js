/**
 * author liubingli
 * 应用相关接口
 */
export default class sheetDownloadSvc {
	constructor(Api) {
		'ngInject';
		this.Api = Api;
	}

	// 报表下载
	sheetDownload(params) {
		return this.Api.get('reportDownload', params);
	}
	isHasFile(params) {
		return this.Api.post('isHasFile',params);
	}
}