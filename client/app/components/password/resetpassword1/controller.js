class resetpassword1Controller {
	constructor($scope, $interval, mineSvc) {
		'ngInject';
		this.interval = $interval;
		this.name = 'resetpassword1';

		this.step = 1;

		// 防止AJAX过程中重复点击
		this.stepOneNext = true;
		this.stepTwoNext = true;


		this.email = '';
		this.disEmail = '';
		this.emailReg = /^\w+@[a-z0-9\-]+(\.[a-z]{2,6}){1,2}$/;
		this.emailNext = false;
		this.emailTips = ' ';
		this.reSend = false;
		this.reSendInput = true;

		// 第二步 显示
		this.indentShow = false;
		this.timer = null;
		this.reSentCon = 60;
		this.indent = '';
		this.secound = '秒';

		this.mineSvc = mineSvc;
	}

	// 邮箱输入
	// 第一步  填写正确邮箱 点下一步  请求成功后  倒计时
	// 第二步  倒计时结束  重新填写正确邮箱  点完成 再倒计时
	emailInputChangeFN() {
		let [email, emailReg] = [this.email, this.emailReg];
		this.reSend = this.emailNext = emailReg.test(email) ? true : false;
		if (this.emailTips) {
			this.emailTips = '';
		}
		// this.emailTips = emailReg.test(email) || !email.length ? '' : '邮箱输入错误，请重新输入';
	};

	// 邮箱  重发验证码的下一步
	emailNextFN() {
		// 邮箱下一步   emailNext ==> false 不可用
		if (this.step === 1) {
			if (!this.emailNext) {
				return;
			}
			if(!this.stepOneNext){	// stepOneNext true可点
				return;
			}
			this.stepOneNext = false;
			this.emailNext = false;
			// 数据请求
			this.sendIndentCODE((data) => {
				if (data && data.code === 0) {
					this.indentShow = true;
					this.disEmail = this.email;
					this.step += 1;
					this.timerFN();
				} else if(data && data.code === 1){
					this.emailTips = data.msg;
				}
				this.stepOneNext = true;
				this.email = '';
				this.emailNext = false;
			});

		} else {
			// 重发验证码 下一步 
			if (!this.reSend) {
				// this.emailTips = '请您输入正确邮箱';
				return
			}
			if(!this.stepTwoNext){
				return;
			}
			this.stepTwoNext = false;
			this.sendIndentCODE((data) => {
				if (data.code === 0) {
					this.reSendInput = true;
					this.timerFN();
					this.secound = '秒';
					this.disEmail = this.email;
				} else if(data && data.code === 1) {
					this.emailTips = data.msg;
				}
				this.stepTwoNext = true;
				this.email = '';
				this.reSend = false;
			});
		}
	};

	// 发送验证码
	sendIndentCODE(dbfn) {
		let params = {
			email: this.email
		};
		this.mineSvc.sendIndentNUM(params).then((data) => {
			if (data) {
				dbfn && dbfn(data);
			}
		}, (data) => {
			console.log('验证码发送失败');
		});
	};

	timerFN() {
		this.reSentCon = 59;
		this.reSend = false;

		this.timer = this.interval(() => {
			this.reSentCon = parseInt(this.reSentCon);
			if (this.reSentCon === 1) {
				this.interval.cancel(this.timer);
				this.reSendInput = false;
				this.reSentCon = '输入邮箱重新获取邮件';
				this.secound = '';
			} else {
				this.reSentCon = this.reSentCon - 1;
				this.secound = '秒';
			}
		}, 1000);
	};

}

export default resetpassword1Controller;