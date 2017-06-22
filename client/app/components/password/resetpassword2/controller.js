class resetpassword2Controller {
    constructor($scope, $location, mineSvc, $cookies) {
        'ngInject';
        this.name = 'resetpassword2';
        this.mineSvc = mineSvc;
        this.location = $location;

        // 是否可以激活状态
        this.isSaveStatus = false;

        // URL数据不全 提示   by kw gyalert组件
        this.alertData = {
            title: '',
            conText: '数据丢失',
            buttonText: '确定',
            isAlertShow: false,
            clickFn: () => {
                this.alertData.isAlertShow = false;
            }
        };

        // 重置密码链接失效  提示   自定义页面单有  使用帐号激活页面样式  kw
        this.loseAlertData = {
            isLoseShow: false,
            loseIcon: require('./images/lose.png'),
            findPassWord: () => {
                this.location.url('/resetpassword1');
            }
        };


        // 重置成功     提示      自定义页面单有  使用帐号激活页面样式 kw
        this.successAlertData = {
            isShow: false,
            successIcon: require('./images/success.png'),
            login: () => {
                that.successAlertData.isShow = false;
                that.location.url('/home');
                if ($cookies.get('token')) {
                    $cookies.remove('token');
                }
            }
        };

        // 邮件过期时间校验
        let userEmail = this.location.search().email ? this.location.search().email : '';
        let restToken = this.location.search().restToken ? this.location.search().restToken : '';
        // 发送邮件的时间
        let serverTime = parseInt(this.location.search().startTime ? this.location.search().startTime : 0);

        if (serverTime != 0 && userEmail && restToken) {
            // console.log('可以修改密码');
            let params = {
                email: userEmail,
                restToken: restToken,
                startTime: serverTime
            };
            this.mineSvc.checkResetPasswordLink(params).then((data) => {
                if (data.code === 0) {
                    this.isSaveStatus = true;
                } else if (data.code === 9) {
                    this.loseAlertData.isLoseShow = true;
                }
            }, (data) => {

            });
        } else {
            // URL参数不全
            this.alertData.isAlertShow = true;
            window.close();
        }

        let that = this;

        this.formData = {
            password1: '',
            password2: ''
        }
        this.formError = {
            password: ''
        }

        this.Bnextstep = false;

    };

    changeFN1() {
        if (!this.isSaveStatus) {
            return;
        }
        let {
            password1,
            password2
        } = this.formData;
        if (!password1.length && !password2.length) {
            this.formError.password = '';
            return;
        } else if (!password1.length && password2.length) {
            this.formError.password = '请输入新密码';
            return;
        } else if (password1.length && !password2.length) {
            this.formError.password = '请输入确认密码';
            return;
        }
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
            } else {
                this.formError.password = '请输入8-16位以字母、数字开头，字母数字下划线至少2种组合的密码';
            }
        } else {
            this.formError.password = '';
        }
        this.Bnextstep = !this.formError.password && (password1.length === password2.length) && (password1.length || password2.length) ? true : false;
    };

    changeFN2() {
        if (!this.isSaveStatus) {
            return;
        }
        let {
            password1,
            password2
        } = this.formData;

        if (!password1.length && !password2.length) {
            this.formError.password = '';
            return;
        } else if (!password1.length && password2.length) {
            this.formError.password = '请输入新密码';
            return;
        } else if (password1.length && !password2.length) {
            this.formError.password = '请输入确认密码';
            return;
        }

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
                } else {
                    this.formError.password = '您两次输入的密码不一致';
                }
            } else {
                this.formError.password = '请输入8-16位以字母、数字开头，字母数字下划线至少2种组合的密码';
            }
        } else {
            this.formError.password = '';
        }
        this.Bnextstep = !this.formError.password && (password1.length || password2.length) ? true : false;
    };

    // 重置密码
    reSetPwFN() {
        if (!this.isSaveStatus) {
            return;
        }
        let {
            password1,
            password2
        } = this.formData;

        if (this.formError.password === '请输入8-16位以字母、数字开头，字母数字下划线至少2种组合的密码' ||
            this.formError.password === '请输入新密码' || this.formError.password === '请输入确认密码') {
            return;
        }

        if (password2 != password1 && (password1.length && password2.length)) {
            this.formError.password = '您两次输入的密码不一致';
            return;
        }

        if (password1.length === 0 || password2.length === 0) {
            this.formError.password = '请输入新密码';
            return;
        }

        this.Bnextstep = !this.formError.password && (password1.length && password2.length) ? true : false;
        if (this.Bnextstep) {
            let params = {
                restToken: this.location.search().restToken,
                email: this.location.search().email,
                pwd: this.formData.password2,
                startTime: this.location.search().startTime,
            };
            if (this.Bnextstep) {
                this.mineSvc.restSetPWD(params).then((data) => {
                    if (data.code === 0) {
                        this.successAlertData.isShow = true;
                    } else if (data.code === 1) {
                        this.formError.password = data.msg;
                    }
                    this.password1 = '';
                    this.password2 = '';
                }, (data) => {
                    this.formError.password = data.msg;
                });
            }
        }
    };

};
export default resetpassword2Controller;
