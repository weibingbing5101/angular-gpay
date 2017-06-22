class Controller {
	constructor($scope, $location, $cookies, Api, sheetDownloadSvc) {
		'ngInject';
		this.$location = $location;
		this.name = 'sheet/download';
		this.$cookies = $cookies;
		this.Api = Api;
		this.sheetDownloadSvc = sheetDownloadSvc;
		this.appId = '';

		this.model = [];
		this.reportType = 'consume';
		this.reportFormat = 'txt';
		this.isbtn = true;
		this.timeFormat = []; //按照标准格式保存日期，['2016','07','12']
		this.errmsg = '';

		this.init();
	};
	init() {
		this.setInputValue();
	};
	setInputValue() {
		let date = new Date();
		let time = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
		this.model = [0, time, this.timeFormat];
	};
	setConsumeType() {
		this.reportType = 'consume';
	};
	setRefundType() {
		this.reportType = 'refund';
	};
	setSettleType() {
		this.reportType = 'settle';
	};
	changeReportType(value){
		this.reportFormat = value;
	}
	getReportFormat(){
		let reportFormat = '0';
		if (this.reportFormat=='csv') {
			reportFormat = '1';
		}
		return reportFormat;
	}
	getIsHasFile() {
		this.appId = this.$location && this.$location.search() && this.$location.search().appId ? this.$location.search().appId : '';

		this.timeFormat = this.model[2];
		let time = this.timeFormat[0] + this.timeFormat[1] + this.timeFormat[2];

		let reportFormat = this.getReportFormat();
		
		let params = {
			reportDate: time,
			reportFormat: reportFormat,
			reportType: this.reportType,
			appId: this.appId
		};
		this.sheetDownloadSvc.isHasFile(params)
			.then(data => {
				if (data.code === 0) {
					this.errmsg = '';
					this.sheetDownloaded();
				} else if (data.code === 1) {
					console.log(data.msg);
					this.errmsg = data.msg;
				}
			});
	};
	sheetDownloaded() {
		this.timeFormat = this.model[2];
		let time = this.timeFormat[0] + this.timeFormat[1] + this.timeFormat[2];
		// let params={reportType:this.reportType,
		// 			 reportFormat:0,
		// 			 reportDate:'20160707'
		// 			};
		// this.sheetDownloadSvc
		// 	.sheetDownload(params)
		// 	.then();

		let basepath = this.Api.basePath;
		let reportFormat = this.getReportFormat();
		let path = basepath + 'reportDownload?token=' + this.$cookies.get('token') + '&reportDate=' + time + '&reportFormat='+reportFormat+'&reportType=' + this.reportType + '&appId=' + this.appId;
		console.log(path);
		window.location.href = path;
		// window.open(path);
		//window.open('http://10.23.0.128:8080/pay-merchant-op/reportDownload?token=211234571390441620160704112820PRD&reportDate=20160707&reportFormat=0&reportType=consume');
	};
}

export default Controller;