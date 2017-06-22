class Controller {
	constructor(mineSvc,$sce) {
		'ngInject';
		this.$sce = $sce;
		this.name = 'mineinforobj';
		this.mineSvc = mineSvc;
		this.showInfor = false;

		// 我的  信息
		this.mineInfor = {
			merchantId: '',
			email: '',
			merOpAuthType: ''
		};


		this.gydisval = this.$sce.trustAsHtml('用于识别商户的唯一标识，由果仁支付自动分配的16位数字')
		console.log(this.gydisval);

		this.init();
	};

	init() {
		this.mineSvc.getMineInforData({}).then((data) => {
			console.log('查询成功');
			console.log(data);
			if (data.code === 0) {
				this.mineInfor = data;
			} else {
			
			}
		}, () => {
			console.log('查询失败');
		});
	};
};

export default Controller;