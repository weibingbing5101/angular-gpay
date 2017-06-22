/**
 * author liubingli
 * 订单管理列表
 */
class settlementController {
    constructor($scope, $location, $cookies,NgTableParams, orderSvc, enumSvc, commonSvc) {
            'ngInject';
            // 注入的服务

            this.scope = $scope;
            this.NgTableParams = NgTableParams;
            this.$location = $location;
            this.orderSvc = orderSvc;
            this.enumSvc = enumSvc;
            this.commonSvc = commonSvc;
            this.currency=$cookies.get('currency');

            // 结算卡信息
            this.bankcardAdd = '';
            this.bankcardNO = '';
            this.bankcardName = '';
            this.okpayAccount = '';

            // 日历相关
            let oDate = new Date();
            this.gygetstartdate = [oDate.getFullYear(), oDate.getMonth() + 1, oDate.getDate()];
            this.gygetenddate = this.gygetstartdate;

            // 定单号 
            this.appOrder = '';

            this.init();

        } //end for constructor

    // 页面刷新 获取数据
    init() {
        this.getBankInfor();
        this.getAppCreatTime();
    }

    // 查询APP创建时间
    getAppCreatTime(){
        let params = {
            appId: this.$location.search() && this.$location.search().appId
        };
        this.orderSvc.getAppCreatTime(params)
        .then((data) => {
            if (data && data.code === 0) {
                this.gygetstartdate = data.object.split('-');
                if (this.gygetstartdate[1]<10) {
                    this.gygetstartdate[1] = this.gygetstartdate[1].substring(1,2);
                }
                if (this.gygetstartdate[2]<10) {
                    this.gygetstartdate[2] = this.gygetstartdate[2].substring(1,2);
                }
                this.searchList();
            }else{
                this.alertData.isAlertShow = true;
                this.alertData.conText = (data && data.msg) ? data.msg : '';
            }
        });
    };
    
    getBankInfor() {
        this.orderSvc.getBankInfor({}).then((data) => {
            // console.log('结算卡信息请求成功');
            if (data.code === 0) {
                // console.log(data);
                this.bankcardAdd = data.merStlBankBrchName;
                this.bankcardNO = data.stlBankCardNo;
                this.bankcardName = data.accountName;
                this.okpayAccount = data.okpayAccount;

            } else {
                // alert(data.msg);
            }
        }, (data) => {
            console.log('结算卡信息请求失败');
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

                return this.orderSvc.getSettlementList(formData).then((data) => {
                    // console.log(data);
                    params.total((data && data.totalSize) || 1); // 一共多少条
                    return (data && data['object']) || []; // 每页的数据
                });
            }
        });
    };

    // 筛选条件
    getSearchFormData() {
        // let filter = this.filter,
        let formData = {
            appId: this.$location.search() && this.$location.search().appId,
            dateStart: this.gyreturnstartdate.join(''), // 开始时间
            dateEnd: this.gyreturnenddate.join(''), // 结束时间
            dispensingOrderNo: this.appOrder, // 定单号
        };
        return formData;
    };
}

export default settlementController;