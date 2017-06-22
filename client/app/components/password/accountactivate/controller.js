class accountactivateController {
    constructor($scope, $location, mineSvc) {
        'ngInject';
        this.name = 'accountactivate';
        this.mineSvc = mineSvc;
        this.location = $location;

        let that = this;
        this.formData = {
            userEmail: '',
            password1: '',
            password2: ''
        }
        this.formError = {
            password: ''
        }

        this.Bnextstep = false;

        // 用户激活按钮状态
        this.isInputBox = false;

        // gy-alert组件数据
        this.alertData = {
            title: '',
            conText: '',
            buttonText: '确定',
            isAlertShow: false,
            clickFn: () => {
                this.alertData.isAlertShow = false;
            }
        };

        // 已经激活
        this.hasAccountActivate = {
            isShow: false,
            hasAccountActivateIcon: require('./images/success.png'),
            login: () => {
                that.location.url('/home');
            }
        };

        // 激活成功
        this.successAlertData = {
            isShow: false,
            successIcon: require('./images/success.png'),
            login: () => {
                that.location.url('/home');
            }
        };


        // 拦截URL当中的邮箱 判断是否激活
        let userEmail = this.location.search().useremail ? this.location.search().useremail : '';
        if (userEmail != '') {
            let params = {
                email: userEmail
            };
            this.formData.userEmail = userEmail;
            this.mineSvc.checkAccountActivate(params).then((data) => {
                // 7 的时候已经激活
                if (data.code === 7) {
                    this.hasAccountActivate.isShow = true;
                } else if (data.code === 0) { // 正常可以激活
                    this.isInputBox = true;
                } else if (data.code === 1) { // 系统繁忙
                    this.alertData.conText = data.msg;
                    this.alertData.isAlertShow = true;
                }
            }, (data) => {
                this.alertData.conText = '请求失败，请刷新页面重试';
                this.alertData.isAlertShow = true;
            });
        } else {
            this.alertData.conText = '数据丢失';
            this.alertData.isAlertShow = true;
        }

    };

    changeFN1() {
        if (!this.isInputBox) {
            return;
        }
        let {
            password1,
            password2
        } = this.formData;

        if (password1.length || password2.length) {
            if (
                (
                    (password1.search(/\d/) >= 0 && password1.search(/[a-zA-Z]/) >= 0) ||
                    (password1.search(/\d/) >= 0 && password1.search(/\_/) > 0) ||
                    (password1.search(/[a-zA-Z]/) >= 0 && password1.search(/\_/) > 0)
                ) &&
                (password1.indexOf('_') != 0) && (/^[a-zA-Z0-9\_]{8,16}$/.test(password1))
            ) {
                if (password1 === password2) {
                    this.formError.password = '';
                } else {
                    if (password1.length && password2.length && (
                            (password2.search(/\d/) >= 0 && password2.search(/[a-zA-Z]/) >= 0) ||
                            (password2.search(/\d/) >= 0 && password2.search(/\_/) > 0) ||
                            (password2.search(/[a-zA-Z]/) >= 0 && password2.search(/\_/) > 0)
                        ) &&
                        (password2.indexOf('_') != 0) && (/^[a-zA-Z0-9\_]{8,16}$/.test(password2))) {
                        this.formError.password = '您两次输入的密码不一致';
                    }
                }
            } else if(password1.length && password2.length){
                this.formError.password = '请输入8-16位以字母、数字开头，字母数字下划线至少2种组合的密码';
            }else if(!password2.length){
                this.formError.password = '请输入确认密码';
            }
        } else {
            this.formError.password = '';
        }
        this.Bnextstep = !this.formError.password && (password1.length === password2.length) && (password1.length || password2.length) ? true : false;
    };

    changeFN2() {
        if (!this.isInputBox) {
            return;
        }
        let {
            password1,
            password2
        } = this.formData;

        if (password1.length || password2.length) {
            if (
                (
                    (password2.search(/\d/) >= 0 && password2.search(/[a-zA-Z]/) >= 0) ||
                    (password2.search(/\d/) >= 0 && password2.search(/\_/) > 0) ||
                    (password2.search(/[a-zA-Z]/) >= 0 && password2.search(/\_/) > 0)
                ) &&
                (password2.indexOf('_') != 0) && (/^[a-zA-Z0-9\_]{8,16}$/.test(password2))
            ) {
                if (password1 === password2) {
                    this.formError.password = '';
                } else if(password1.length && password2.length){
                    this.formError.password = '您两次输入的密码不一致';
                }
            } else if(password2.length){
                this.formError.password = '请输入8-16位以字母、数字开头，字母数字下划线至少2种组合的密码';
            }else if(!password2.length){
                this.formError.password = '请输入确认密码';
            }
        } else {
            this.formError.password = '';
        }
        this.Bnextstep = !this.formError.password && (password1.length || password2.length) ? true : false;
    };

    // 重置密码
    accountActivateFn() {
        if (!this.isInputBox) {
            return;
        }
        let {
            userEmail,
            password1,
            password2
        } = this.formData;
        if (password1.length === 0) {
            this.formError.password = '请输入新密码';
            return;
        }

        if (password2.length === 0){
            this.formError.password = '请输入确认密码';
            return;
        }  

        if (this.formError.password === '请输入8-16位以字母、数字开头，字母数字下划线至少2种组合的密码' ||
            this.formError.password === '请输入新密码' || this.formError.password === '请输入确认密码') {
            return;
        }

        if (password2 != password1 && (password1.length && password2.length)) {
            this.formError.password = '您两次输入的密码不一致';
            return;
        }

      

        this.Bnextstep = !this.formError.password && (password1.length && password2.length) ? true : false;
        if (this.Bnextstep) {
            let params = {
                email: this.formData.userEmail,
                pwd1: this.formData.password1,
                pwd2: this.formData.password2
            };
            console.log(params);
            if (this.Bnextstep) {
                this.mineSvc.accountActivate(params).then((data) => {
                    if (data.code === 0) {
                        this.successAlertData.isShow = true;
                    } else {
                        this.formError.password = data.msg;
                    }
                    this.formData.password1 = '';
                    this.formData.password2 = '';
                }, (data) => {
                    this.formError.password = data.msg;
                });
            }
        }
    };

};
export default accountactivateController;
