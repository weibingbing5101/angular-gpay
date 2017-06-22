/**
 * author liubingli
 * 商户订单相关接口
 */
export default class orderSvc {
    constructor(Api) {
        'ngInject';
        this.Api = Api;
    }

    // app查询创建时间
    getAppCreatTime(params) {
        return this.Api.post('queryAppCreateTime', params);
    };

    // 订单查看详情
    getOrderDetail(params) {
        /*
        if (process && process.env && process.env.NODE_ENV == 'dev') {
            let data = {
                code: 0,
                msg: 'null',
                object: {
                    "tradeTime": 1476777999999,
                    "payTime": "2016-10-14 14:00:00",
                    "mercOrdrNo": "1000",
                    "consNo": "100",
                    "tradeAmount": "1001",
                    "status": "0",
                    "payStl": "gop",
                    "payCurrency": "gop详情查询",
                    "isRefund": "1",
                    "gopAmount": "42.22",
                    "gopPrice": "100"
                }

            };
            return this.Api.testData(data);
        }
        */
        return this.Api.post('viewOrderDetail', params);
    };

    // 订单列表查询
    getAllList(params) {
        /*
        if (process && process.env && process.env.NODE_ENV == 'dev') {
            let data = {
                code: 0,
                msg: 'null',
                object: [{
                    "tradeVolume": "42.22",
                    "orderNum": "100",
                    "mercOrdrNo": "1000",
                    "consNo": "100",
                    "tradeAmount": "10012",
                    "status": "0",
                    "payStl": "gop",
                    "tradeTime": "2016-10-14 12:00:00",
                    "payTime": "2016-10-14 14:00:00",
                    "refundAmount": "199"
                }]
            };
            return this.Api.testData(data);
        }
        */
        return this.Api.post('merchantAppOrder', params);
    }

    // 退款列表查询
    getRefundList(params) {
        /*
        if (process && process.env && process.env.NODE_ENV == 'dev') {
            let data = {
                code: 0,
                msg: 'null',
                object: [{
                    "tradeVolume": "42.22",
                    "orderNum": "100",
                    "mercOrdrNo": "1000",
                    "consNo": "100",
                    "tradeAmount": "1001",
                    "status": "0",
                    "payStl": "gop",
                    "tradeTime": "2016-10-14 12:00:00",
                    "payTime": "2016-10-14 14:00:00",
                    "refundAmount": "199",
                    "refundType": 1
                }, {
                    "tradeVolume": "42.22",
                    "orderNum": "100",
                    "mercOrdrNo": "1000",
                    "consNo": "100",
                    "tradeAmount": "1001",
                    "status": "0",
                    "payStl": "gop",
                    "tradeTime": "2016-10-14 12:00:00",
                    "payTime": "2016-10-14 14:00:00",
                    "refundAmount": "199",
                    "refundType": 0
                }]
            };
            return this.Api.testData(data);
        }
        */
        return this.Api.post('refundOrder', params);
    }

    // 退款详情
    viewRefundDetail(params) {
        /*
        if (process && process.env && process.env.NODE_ENV == 'dev') {
            let data = {
                code: 0,
                msg: 'null',
                object: {
                    "refundTime": "2016-10-14 12:00:00",
                    "refundPayTime": "2016-10-14 14:00:00",
                    "mercOrdrNo": 123,
                    "consNo": 123,
                    "mercRefundNo": 123,
                    "refundNo": 123,
                    "tradeAmount": 123,
                    "refundAmount": 123,
                    "refundStatus": 1,
                    "refundType": 0,
                    "payCurrency": "CNY",
                    "userId": 123,
                    "accountName": 123,
                    "merStlBankName": 123,
                    "stlBankCardNo": 123
                }
            };
            return this.Api.testData(data);
        }
        */
        return this.Api.post('viewRefundDetail', params);
    }


    // 结算列表查询
    getSettlementList(params) {
        return this.Api.post('settlementList', params);
    }

    // 结算银行卡信息
    getBankInfor(params) {
        return this.Api.post('queryBankCard', params);
    }

    // 退款操作
    refundOperation(params) {
        return this.Api.post('refundOperation', params);
    }
}