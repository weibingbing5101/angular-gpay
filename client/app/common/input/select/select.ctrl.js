class Controller {
	constructor($scope, $timeout) {
		'ngInject';
		this.scope = $scope;
		this.timeout = $timeout;
		this.name = 'select';

		this.bShow = false;

		if (this.gyseldata && Array.isArray(this.gyseldata) && this.gyseldata.length > 0) {
			this.gyreturnval = this.gyseldata[0]; // 默认 || 返回的键值
			this.selValue = this.gyseldata[0].value; // 默认 || 标题显示
		} else {
			this.gyseldata = null;
			this.gyreturnval = null;
		}

		$(document).click(function() {
			if (this.bShow) {
				this.bShow = false;
				this.scope.$apply();
			}
			//var target = $(ev.target).closest('.zns_select');
		}.bind(this));
	};

	// 点击显示 阻止冒泡执行document的click事件
	changeFN(event) {
		// 隐藏  有值对象  有值数组
		if (!this.bShow) {
			this.timeout(() => {
				this.bShow = !this.bShow;
			}, 30);
		}
		// event.stopPropagation();
	};
	// 赋值隐藏
	changeValFN(item) {
		this.selValue = item.value;
		this.bShow = false;
		this.gyreturnval = item;
		console.log(this.gyreturnval);
	};
}
export default Controller;