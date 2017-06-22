/**
 * author liubingli
 * 订单管理列表
 */
class ListController {
    constructor($scope, $location, $cookies,$timeout, NgTableParams, orderSvc, appSvc) {
        'ngInject';
        this.scope = $scope;
        this.$timeout = $timeout;
        this.$location = $location;
        this.NgTableParams = NgTableParams;
        this.orderSvc = orderSvc;
        this.appSvc = appSvc;
        this.orderListShow = true;
        this.currency=$cookies.get('currency');

        // 查询APP创建时间
        this.alertData = {
            title: '',
            conText: '',
            buttonText: '确定',
            isAlertShow: false,
            clickFn: () => {
                this.alertData.isAlertShow = false;
            }
        };

        // 退款窗口  相关信息
        this.isrefundWinShow = false; // 退款窗口
        this.isSuccessWinShow = false;
        this.isFaildWinShow = false; // 退款窗口显示状态
        this.usableRefundNum = 0; // 可用退款金额 
        this.refundNum = ''; // 退款输入框
        this.mercOrdrNo = ''; // 退款所用 商户订单号
        this.isCommitRefund = false; // 退款按钮 是否可点 状态
        this.refundTips = ''; // 退款错误提示
        this.refundAJAX = false; // 退款的AJAX信号 
        this.loginPassword = ''; // 退款登陆密码
        this.refundErrorMsg = ''; // 退款失败原因

        this.refundTimer = null; // 退款输入框发生change的函数

        // 日历相关
        let oDate = new Date();
        this.gygetstartdate = [oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate()];
        this.gygetenddate = [oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate()];

        // 定单号 
        this.appOrder = '';

        // 渠道状态  现在只有移动支付
        this.ditchStatusEnum = [{
            key: 0,
            value: '移动支付'
        }];
        this.gyReturnDitch = this.ditchStatusEnum[0];


        // 付款状态  已支付1，未支付0
        this.payStatusEnum = [{
            key: '',
            value: '全部订单状态 '
        }, {
            key: 1,
            value: '已支付'
        }, {
            key: 0,
            value: '未支付'
        }];
        this.gyReturnPayStatusEnum = this.payStatusEnum[0];

        // 退款状态
        this.refundStatusEnum = [{
            key: '',
            value: '全部退款状态'
        }, {
            key: 1,
            value: '有退款'
        }, {
            key: 0,
            value: '无退款'
        }];
        this.gyReturnRefundStatusEnum = this.refundStatusEnum[0];

        // 查看详情数据
        this.detailData = {
            isDetailShow: false,
            DetailCloseFn: () => {
                console.log(123);
                this.detailData.isDetailShow = false;
            },
            object: {
                tradeTime: '2012-07-20 16:00:00', //  交易起时间
                payTime: '2012-07-20 18:00:00', //  交易完成时间
                mercOrdrNo: '11111111111111111', //  商户订单号
                consNo: '222222222222222', // 果付订单号
                tradeAmount: '100.00', // '订单金额'
                status: '已支付/未支付', // 订单支付状态
                payStl: '果付渠道', // 渠道
                payCurrency: 'CNY/GOP', // 支付币种
                isRefund: '有退款、无退款', // 退款状态
                gopAmount: '33.33', // 支付果仁数
                gopPrice: '200.00元/Gop' // 成交价
            }

        };
        this.init();
    }; //end for constructor

    // 页面刷新 获取数据
    init() {
        this.getAppCreatTime();
    };

    // 查询APP创建时间
    getAppCreatTime() {
        let params = {
            appId: this.$location.search() && this.$location.search().appId
        };
        this.orderSvc.getAppCreatTime(params)
            .then((data) => {
                if (data && data.code === 0) {
                    this.gygetstartdate = data.object.split('-');
                    if (this.gygetstartdate[1] < 10) {
                        this.gygetstartdate[1] = this.gygetstartdate[1].substring(1, 2);
                    }
                    if (this.gygetstartdate[2] < 10) {
                        this.gygetstartdate[2] = this.gygetstartdate[2].substring(1, 2);
                    }
                    this.searchList();
                } else {
                    this.alertData.isAlertShow = true;
                    this.alertData.conText = (data && data.msg) ? data.msg : '';
                }
            });
    };

    // api获取数据
    searchList() {
        this.tableParams = new this.NgTableParams({
            count: 10
        }, {
            getData: (params) => {
                let formData = angular.extend(this.getSearchFormData() || {}, {
                    pageNum: params.url().page // 查询第几页
                }, {
                    pageSize: params.count() // 一页多少个
                });

                return this.orderSvc.getAllList(formData).then((data) => {
                    if (data.code === 0) {
                        // console.log(data);
                        params.total((data && data.totalSize) || 1); // 一共多少条
                        return (data && data['object']) || []; // 每页的数据
                    } else {
                        console.log(data.msg);
                    }
                });
            }
        });
    };

    // 筛选条件
    getSearchFormData() {
        let oDate = new Date();
        let formData = {
            appId: this.$location.search() && this.$location.search().appId,
            ordrPaySts: this.gyReturnPayStatusEnum.key, //    已支付1，未支付0
            ordrRefdSts: this.gyReturnRefundStatusEnum.key, // 0是未退款，1有退
            payStl: this.gyReturnDitch.key, // 渠道  写死目前只有移动
            startDate: this.gyreturnstartdate.join(''), // 开始时间
            endDate: this.gyreturnenddate.join(''), // 结束时间
            appOrder: this.appOrder, // 定单号
        };
        return formData;
    };

    // 查看详情
    readDetailFN(mercOrdrNo) {
        let params = {
            mercOrdrNo: mercOrdrNo,
            appId: this.$location.search() && this.$location.search().appId,
            refundAmout: this.refundNum,
        };
        this.orderSvc.getOrderDetail(params).then((data) => {
            if (data && data.code === 0) {
                this.detailData.object = data.object;
                this.detailData.object.payTime = this.detailData.object.payTime ? this.detailData.object.payTime : 'noPayMent';
                this.detailData.isDetailShow = true;
                console.log(this.detailData.object.payTime);
            }
        }, (data) => {
            this.alertData.isAlertShow = true;
            this.alertData.conText = (data && data.msg) ? data.msg : '';
        });

    };

    // 退款操作  可退款数      商户订单号
    refundFN(refundAmount, mercOrdrNo) {
        // 先查APP状态
        let params = {
            appId: this.$location.search() && this.$location.search().appId
        };
        this.appSvc.queryAppIsFrozen(params).then((data) => {
            if (data && data.code === 0) { // 退款成功 
                this.isrefundWinShow = true;
                this.isCommitRefund = false; // 确定按钮可用状态
                this.refundNum = ''; // 用户输入价格
                this.usableRefundNum = refundAmount; // 可用退款
                this.mercOrdrNo = mercOrdrNo; // 退款所用 商户订单号                
            }
        }, (data) => {

        });
    };
    // 退款输入框 变化
    refundNumFN() {
        if (this.refundTips) {
            this.refundTips = '';
        }
        if (this.isCommitRefund) {
            this.isCommitRefund = false;
        }
        this.refundNum = this.refundNum.replace(/[^.\d]/g, '');
        // 有两个小数点
        if (this.refundNum.indexOf('.') !== this.refundNum.lastIndexOf('.')) {
            this.refundNum = this.refundNum.substring(0, this.refundNum.lastIndexOf('.'));
        }
        // 有一个小数点
        if (this.refundNum.indexOf('.') !== -1) {
            this.refundNum = this.refundNum.substring(0, this.refundNum.indexOf('.') + 3);
        } else { // 没有小数点
            this.refundNum = parseInt(this.refundNum);
        }

        // 不是数字  有长度  且没有小数点
        if (!parseFloat(this.refundNum) && this.refundNum.length && this.refundNum.indexOf('.') === -1) {
            this.refundTips = '请输入正确退款金额';
            return;
        }
        this.isCommitRefund = (parseFloat(this.refundNum) <= this.usableRefundNum && parseFloat(this.refundNum) > 0) ? true : false;
        this.refundTips = parseFloat(this.refundNum) > this.usableRefundNum ? '输入金额不可大于可退款金额' : '';
    };


    // 支付密码change
    refundPasswordFN() {
        // this.refundTips = '';
    };


    // 关闭退款窗口
    closeRefundWin() {
        this.isrefundWinShow = false;
        this.refundTips = '';
        this.refundNum = '';
        this.loginPassword = '';
        this.isCommitRefund = false;
    };
    // 退款确认操作
    commitRefundFN() {
        if (this.refundTips) {
            return;
        }
        // 防止连续点击退款按钮
        if (this.refundAJAX) {
            return;
        }

        if (!this.isCommitRefund && this.refundNum !== '') {
            this.refundTips = '请输入正确退款金额';
            return;
        }
        // 退款金额为空时
        if (!this.isCommitRefund && this.refundNum === '') {
            this.refundTips = '请输入退款金额';
            return;
        }
        // 退款金额为空时
        if (!this.isCommitRefund && this.refundNum === 0) {
            this.refundTips = '请输入正确退款金额';
            return;
        }
        // 帐号密码为空时
        if (!this.loginPassword.length) {
            this.refundTips = '请输入登录密码';
            return;
        }
        this.refundAJAX = true;
        this.isCommitRefund = false;
        console.log(111);
        // this.refundTips = '申请退款中，请稍等！';
        let params = {
            mercOrdrNo: this.mercOrdrNo,
            appId: this.$location.search() && this.$location.search().appId,
            refundAmout: this.refundNum,
            passWord: this.loginPassword
        };
        this.orderSvc.refundOperation(params).then((data) => {
            if (data.code === 0) { // 退款成功 
                this.isSuccessWinShow = true;
                this.orderListShow = false;
                this.refundTips = '';
                this.refundAJAX = false;
            } else if (data.code === 800031) { // 退款失败跳转页面
                // this.refundTips = data.msg;
                this.refundErrorMsg = data.msg ? data.msg : '';
                this.isFaildWinShow = true;
                this.orderListShow = false;
                this.refundAJAX = false;
            } else if (data.code === 1) { // 退款失败显示相关原因
                this.refundTips = data.msg;
                this.loginPassword = '';
                this.refundNum = '';
                this.refundAJAX = false;
                return;
            }
            this.isrefundWinShow = false;
            this.refundNum = '';
            this.loginPassword = '';
            this.refundTips = '';
        }, (data) => {
            console.log(data);
            this.isFaildWinShow = true;
            this.refundNum = '';
            this.refundTips = '';
            this.refundAJAX = false;
        });
    };
    // 退款  成功  失败 返回到订单列表页
    backToOrderList() {
        this.init();
        this.orderListShow = true;
        this.isSuccessWinShow = false;
        this.isFaildWinShow = false;
    };
    // 失败后重新发起提交
    resentRefunshFN() {
        this.orderListShow = true;
        this.isFaildWinShow = false;
        this.isrefundWinShow = true;
        this.refundTips = '';
        this.isCommitRefund = false;
    };

    // 数字格式化
    numFormat(num) {
        let returnNmu = num;
        returnNmu = returnNmu.replace(/[^\d]/g, '');

        returnNmu = parseFloat(returnNmu);

        return returnNmu;
    };
};



export default ListController;

/*
  // suggesion用法示例

  getSugList(storename) {
    return this.commonSvc
      .getStoreList({
        storeName: storename
      })
      .then(data => {
        return data;
      });
  }

 */
