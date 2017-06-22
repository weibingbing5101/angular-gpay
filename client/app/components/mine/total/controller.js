class Controller {
	constructor(mineSvc,$cookies) {
		'ngInject';
		this.name = 'minetotalobj';

		this.mineSvc = mineSvc;
		this.currency=$cookies.get('currency');
		// this.currency='CNY';

		this.showInfor = false;
		this.mineTotal = {
			cashAvailableAmount: '', //可用金额
			cashFrozenAmount: '', //冻结金额
			prepayTotalAmount: '', //待结算金额
			securityTotalAmount: '', //保证金
			imprestAvailableAmount: '', //备付金可用金额
			imprestTotalAmount: '' //备付金总金额
		};

		this.gydisval = '当发起退款时，我们会将退款金额从您的备付金中扣除，请保证金额充足';

		this.init();
	}

	init() {
		this.mineSvc.getMineTotalData({}).then((data) => {
			console.log('查询成功');
			console.log(data);
			if (data.code === 0) {
				this.mineTotal = data.object;
			} else {

			}
		}, () => {
			console.log('查询失败');
		});

		
	};

	showInforFN() {
		this.showInfor = true;
	};
	hideInforFN() {
		this.showInfor = false;
	};


};

export default Controller

/*export default angular
  .module('mineTotal')
  .controller('Controller', Controller);*/

