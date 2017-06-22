class Controller {
	constructor($scope,$cookies,NgTableParams,mineSvc,$sce) {
		'ngInject';
		this.NgTableParams=NgTableParams;
		this.$sce = $sce;
		this.$cookies=$cookies;
		this.name = 'minenotifyKeyobj';
		this.mineSvc = mineSvc;
		this.showInfor = false;
		this.tok;
		this.RSA;
		this.RSARecord;
		this.gydisval = this.$sce.trustAsHtml('用于识别商户的唯一标识，由果仁支付自动分配的16位数字')
		console.log(this.gydisval);

		this.init();
	};


    
	init() {
	this.tok={token:this.$cookies.get('token')};
	this.mineSvc.querySRA(this.tok).then((data) =>{
		  this.RSA=data.object;
	    });

	this.mineSvc.queryNotifyKeyRecord(this.tok).then((data) =>{
		  this.RSARecord=data.object;
	    });
	};
};

export default Controller;