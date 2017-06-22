class Controller {
    constructor($timeout, $location, $cookies, homeSvc, baseTool) {
        'ngInject';
        this.$location = $location;
        this.name = 'homeobj';
        this.images = {
            loginboxbottom: require('./images/login_box_bottom.png'),
            conlistitem1: require('./images/con_list_item1.png'),
            conlistitem2: require('./images/con_list_item2.png'),
            conlistitem3: require('./images/con_list_item3.png'),
            conliststep: require('./images/con_list_step.png'),
            conlisticon: [
                require('./images/con_list_icon0.png'),
                require('./images/con_list_icon1.png'),
                require('./images/con_list_icon2.png'),
                require('./images/con_list_icon3.png'),
                require('./images/con_list_icon4.png'),
                require('./images/con_list_icon5.png')
            ],
            mbanner: require('./images/m-banner.png'),
            marrow: require('./images/m-arrow.png'),
            conconcatlist: [
                require('./images/con_concat0.png'),
                require('./images/con_concat1.png')
            ],
            indentImg: '',
        };

        this.homeSvc = homeSvc;
        this.timeout = $timeout;
        this.$cookies = $cookies;
        this.baseTool = baseTool;


        // 登录 是否成功
        this.BloginSuccess = false; //是否登录

        // 邮箱相关
        this.emailReg = /^\w+@[a-z0-9\-]+(\.[a-z]{2,6}){1,2}$/i;
        this.prevEmail = '';
        this.email = '';
        this.emailChangeTimer = null;

        // 登录按钮状态
        this.BloginBtn = false;

        this.password = '';

        this.tips = '';
        this.nextNum = 0;

        // 验证码
        this.indentCode = '';
        this.BindentShow = false;

        this.userAccNum = this.$cookies.get('email') || '';

        this.goToBusinesshome = '';

        this.init();
        // this.userAccNum = '510137831@qq.com';

    }; // end for constructor

    init() {
        // 是否登录
      
        this.BloginSuccess = this.$cookies.get('token') ? true : false;
      
        this.timeout(() => {
            this.BloginBtn = this.email && this.emailReg.test(this.email);
        }, 500);


        // PC打开才自动focus到email输入框
        if (!this.baseTool.isPhone()) {
            if (document.getElementById('email_login')) {
                document.getElementById('email_login').focus();
            }
        }

    };

    // 邮箱输入时
    emailChangeFN() {
        this.tips = (this.emailReg.test(this.email) || !this.email.length) ? '' : '请输入正确邮箱';

        if (this.tips) {
            this.BloginBtn = false;
            return;
        }
        // 此处校验  验证码 密码 邮箱格式 和密码校验同样方式
        this.passwordChangeFN();
        // 根据邮箱判断是否需要验证码
        if (!this.emailReg.test(this.email) || this.prevEmail === this.email) {
            return;
        }
        // this.homeSvc.isNeedIndent({
        //     email: this.email
        // }).then((data) => {
        //     // 0 不需要验证码 1 失败 3需要验证码  6商户帐号被删除
        //     if (data.code === 3) {
        //         this.indentCode = '';
        //         this.getIndentFN({
        //             email: this.email
        //         });
        //         this.prevEmail = this.email;
        //         this.BloginBtn = (this.indentCode.length === 4) && (this.password.length >= 8 && this.password.length <= 16) && (this.emailReg.test(this.email)) ? true : false;
        //     } else if (data.code === 0) {
        //         this.indentCode = '';
        //         this.BindentShow = false;
        //         this.prevEmail = this.email;
        //         this.BloginBtn = (this.password.length >= 8 && this.password.length <= 16) && (this.emailReg.test(this.email)) ? true : false;
        //     } else if (data.code === 1) {
        //         this.tips = data.msg;
        //     }
        // }, (data) => {
        //     this.tips = '超时请重试';
        // });
    };



    // 密码输入时
    passwordChangeFN() {
        // 只邮箱验证通过
        if (!this.emailReg.test(this.email)) {
            return;
        }
        // 有无验证码
        if (this.BindentShow) {
            this.BloginBtn = this.indentCode.length === 4 && (this.password.length >= 8 && this.password.length <= 16) ? true : false;
        } else {
            this.BloginBtn = this.password.length >= 8 && this.password.length <= 16 ? true : false;
        }
    };

    // 验证码输入
    indentChangeFN() {
        // 只邮箱验证通过
        if (!this.emailReg.test(this.email)) {
            return;
        }
        // 根据是否需要验证码判断下一步可用
        this.BloginBtn = this.indentCode.length === 4 && (this.password.length >= 8 && this.password.length <= 16) ? true : false;
    };

    keydownLoginFN(event) {
        if (event.keyCode === 13) {
            this.loginFN();
        }
    }

    // 登录按钮
    loginFN() {
        if (!this.BloginBtn) {
            // this.tips = '请输入邮箱和密码!';
            return;
        }

        let params = {
            email: this.email,
            pwd: this.password,
            verifyCode: this.indentCode,
        };
        this.homeSvc.login(params).then((data) => {
            if (data.code === 0) { // 0 成功   1 验证码||帐户||密码问题   3 需要验证码
                let expireTime = new Date();
                expireTime.setFullYear(2046);
                this.$cookies.put('token', data.token, {
                    'expires': expireTime
                });
                console.log("----loginfan:"+data)
                let emailTime = new Date();
                emailTime.setFullYear(2046); //email 设置2046年过期，只有重新登录后才设置，by 刘炳礼
                this.$cookies.put('email', this.email, {
                    'expires': emailTime
                });

                this.userAccNum = this.email;
                this.BloginSuccess = true;
                
                //根据code显示币种
                this.$cookies.put('currency',data.currency, {
                    'expires': emailTime
                });
             

            } else if (data.code === 1) {
                console.log(data.msg);
                this.tips = data.msg;
                this.password = '';
                this.indentCode = '';
            } else if (data.code === 3) {
                this.getIndentFN({
                    email: this.email
                });
                this.tips = data.msg;
            }
            this.BloginBtn = false;
        }, (data) => {
            console.log(data);
            console.log('登录失败，请重试');
        });
    };

    // 获取验证码
    getIndentFN(json) {
        this.images.indentImg = this.homeSvc.getIndent(json);
        this.BindentShow = true;
    };

    // 退出登录
    exitFN() {
        this.homeSvc.logout({}).then((data) => {
            if (data.code === 0) {
                this.$cookies.put('token', '');
                this.BloginSuccess = false;
                this.BloginBtn = (this.email && this.emailReg.test(this.email)) && (this.password && this.password.length && this.password.length >= 8) ? true : false;
                this.email = '';
                this.password = '';
                this.indentCode = '';
                this.tips = '';
            }
        }, (data) => {
            console.log('退出失败，请重试');
        });
    };

    // 忘记密码点击事件
    forgetPassWord() {
        if (this.email) {
            let params = {
                email: this.email
            };
            this.homeSvc.checkAccountStatus(params).then((data) => {
                if (data.code === 0) {
                    this.$location.url('/resetpassword1');
                } else if (data.code === 1) { // 1   各种错误繁忙
                    this.tips = data.msg;
                }
            }, (data) => {

            });
        } else {
            this.$location.url('/resetpassword1');
        }
    };

} // end for class
export default Controller;
