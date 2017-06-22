class Controller {
    constructor($cookies, $rootScope, $scope, $location, mineSvc, homeSvc) {
        'ngInject';
        this.$cookies = $cookies;
        this.mineSvc = mineSvc;
        this.homeSvc = homeSvc;
        this.name = 'mineeditpwdobj';
        let that = this;

        // 没点保存
        $rootScope.$on('$locationChangeStart', this.routerChangeFN.bind(this));

        // 修改密码成功     提示      自定义页面单有  使用帐号激活页面样式 kw
        this.successAlertData = {
            isShow: false,
            successIcon: require('./images/success.png'),
            login: () => {
                this.successAlertData.isShow = false;
            }
        };

        // 密码1 密码1 双向绑定
        this.formData = {
            password1: '',
            password2: ''
        };

        // 错误提示
        this.formError = {
            password: ''
        };

        // 下一步按钮
        this.Bnextstep = false;
    };

    sameFN() {
        if (this.formError.password != '请输入原始密码') {
            this.formError.password = '';
        }
    };

    // 第一个输入框FN
    changeFN1() {
        let {
            password1,
            password2
        } = this.formData;
        if (!password1.length) {
            this.formError.password = '请输入原始密码';
            return;
        }

        if (password1.length === 0 && password2.length === 0) {
            this.formError.password = '';
            return;
        }
        // if (password1 === password2) {
        //     this.formError.password = '新密码不可与老密码一致，请重新输入';
        //     return;
        // }
        this.Bnextstep = password1.length && password2.length && !this.formError.password ? true : false;
    };
    // 第二个输入框FN	
    changeFN2() {
        let {
            password1,
            password2
        } = this.formData;

        if (!password1.length) {
            this.formError.password = '请输入原始密码';
            return;
        }
        // 如果密码不同  再继续判断密码组合
        // if (password1.length && password2.length && password1 === password2) {
        //     this.formError.password = '新密码不可与老密码一致，请重新输入';
        //     return;
        // }
        if (
            ((
                    (password2.search(/\d/) >= 0 && password2.search(/[a-zA-Z]/) >= 0) ||
                    (password2.search(/\d/) >= 0 && password2.search(/\_/) > 0) ||
                    (password2.search(/[a-zA-Z]/) >= 0 && password2.search(/\_/) > 0)
                ) &&
                (password2.indexOf('_') != 0) &&
                (/^[a-zA-Z0-9\_]{8,16}$/.test(password2))) || (password1.length === 0 && password2.length === 0)
        ) {
            this.formError.password = '';
        } else {
            this.formError.password = '新密码格式不正确，请输入8-16位以字母、数字开头，字母数字下划线至少2种组合的密码';
            return;
        }

        this.Bnextstep = !this.formError.password && (password1.length && password2.length) ? true : false;
    };
    // 点击修改密码按钮
    mineReSetPwFN() {
        this.changeFN2()
        let params = {
            oldPwd: this.formData.password1,
            newPwd: this.formData.password2,
        };
        if (this.Bnextstep) {
            this.mineSvc.mineRestSetPWD(params).then((data) => {
                if (data.code === 0) {
                    this.formData.password1 = '';
                    this.formData.password2 = '';
                    this.successAlertData.isShow = true;
                } else if (data.code !== 2 && data.code !== 4 && data.code !== 5 && data.code !== 6) {
                    this.formError.password = data.msg;
                }
                this.Bnextstep = false;
            }, (data) => {
                console.log('修改密码失败请重试');
            });
        }
    };

    // 没保存密码的时候 就跳转页面
    routerChangeFN() {
        let {
            password1,
            password2
        } = this.formData;
        if (password1.length || password2.length) {
            console.log('没有保存密码');
        }
    };


};

export default Controller;
