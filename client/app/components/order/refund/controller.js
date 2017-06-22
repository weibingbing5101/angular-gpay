/**
 * author liubingli
 * 订单管理列表
 */
class refundController {
    constructor($scope, $location, $cookies,NgTableParams, orderSvc) {
            'ngInject';
            this.scope = $scope;
            this.$location = $location;
            this.NgTableParams = NgTableParams;
            this.orderSvc = orderSvc;
            this.currency=$cookies.get('currency');

            // 日历相关
            let oDate = new Date();
            this.gygetstartdate = [oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate()];
            this.gygetenddate = this.gygetstartdate;

            // 定单号 
            this.appOrder = '';

            // 退款状态   成功2，处理中1
            this.refundStatusEnum = [{
                key: '',
                value: '全部退款状态 '
            }, {
                key: 2,
                value: '退款成功'
            }, {
                key: 1,
                value: '处理中'
            }];

            // 退款方式   原路返回2，退款至商户结算卡1
            /*
            this.refundTypeEnum = [{
                key: '',
                value: '全部退款方式 '
            }, {
                key: 0,
                value: '原路返回'
            }, {
                key: 1,
                value: '退款至商户结算卡'
            }];
            */

            // 默认筛选条件
            this.gyReturnRefundStatusEnum = this.refundStatusEnum[0];


            // 查看详情数据
            this.detailData = {
                isDetailShow: false,
                DetailCloseFn: () => {
                    this.detailData.isDetailShow = false;
                },
                object: {
                    // tradeTime: '2012-07-20 16:00:00', //  交易起时间
                    // payTime: '2012-07-20 18:00:00', //  交易完成时间
                    // mercOrdrNo: '11111111111111111', //  商户订单号
                    // consNo: '222222222222222', // 果付订单号
                    // tradeAmount: '100.00', // '订单金额'
                    // status: '已支付/未支付', // 订单支付状态
                    // payStl: '果付渠道', // 渠道
                    // payCurrency: 'CNY/GOP', // 支付币种
                    // isRefund: '有退款、无退款', // 退款状态
                    // gopAmount: '33.33', // 支付果仁数
                    // gopPrice: '200.00元/Gop' // 成交价
                }
            };

            this.init();

        } //end for constructor

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

                return this.orderSvc.getRefundList(formData).then((data) => {
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
        // let filter = this.filter,
        console.log(this.gyreturnstartdate);
        let formData = {
            appId: this.$location.search() && this.$location.search().appId,
            status: this.gyReturnRefundStatusEnum.key, // 退款成功2，处理中1
            refundType: 0,//this.gyReturnRefundTypeEnum.key,
            startDate: this.gyreturnstartdate.join(''), // 开始时间
            endDate: this.gyreturnenddate.join(''), // 结束时间
            mercRefundNo: this.appOrder, // 商户退款定单号
        };
        return formData;
    };

    refundDetail(type, mercRefundNo) {
        this.detailData.object.refundType = type;
        this.detailData.isDetailShow = true;
        let params = {
            appId: this.$location.search() && this.$location.search().appId,
            mercRefundNo: mercRefundNo
        };
        this.orderSvc.viewRefundDetail(params)
            .then(data => {
                this.detailData.object = data.object;
            }, err => {

            });

    }
}

export default refundController;