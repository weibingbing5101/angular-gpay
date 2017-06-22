let NavConfigFactory = function() {

    // return NAV_CONFIG;
    return {
        getData: function(location) {
            let appName = location && location.search() && location.search().appName ? location.search().appName : '';

            let businessJSON = {
                url: '/business/businesshome',
                name: '商户首页'
            };

            //========================================== 相关页面配置 
            let NAV_CONFIG = {

                '/app/add': [{
                    url: '/order/list',
                    name: '订单列表'
                }, {
                    name: '应用添加'
                }],

                '/sheet/download': [
                    businessJSON, {
                        url: '/sheet/download',
                        name: appName
                    }
                ],

                '/app/create': [
                    businessJSON, {
                        url: '/app/create',
                        name: '创建应用'
                    }
                ],

                // =============================  应用概况  交易管理  应用信息
                '/app/desc': [businessJSON, {
                    url: '/app/desc',
                    name: appName
                }],

                '/order/home': [
                    businessJSON, {
                        url: '/app/desc',
                        name: appName // 商户订单
                    }
                ],

                '/order/list': [
                    businessJSON, {
                        url: '/app/desc',
                        name: appName // 商户订单
                    }
                ],

                '/order/refund': [
                    businessJSON, {
                        url: '/app/desc',
                        name: appName //'退款记录'
                    }
                ],

                '/order/settlement': [
                    businessJSON, {
                        url: '/app/desc',
                        name: appName //'结算记录'
                    }
                ],

                '/app/infor': [
                    businessJSON, {
                        url: '/app/desc',
                        name: appName //'应用信息'
                    }
                ],

                // =============================  我的相关
                '/mine/total': [
                    businessJSON, {
                        url: '/mine/total',
                        name: '我的账户',
                    }
                ],
                '/mine/infor': [
                    businessJSON, {
                        name: '我的账户',
                        url: '/mine/total'
                    }
                ],
                 '/mine/secretKey/transcationKey': [
                    businessJSON, {
                        name: '我的账户',
                        url: '/mine/total'
                    }
                ],
                '/mine/secretKey/notifyKey': [
                    businessJSON, {
                        name: '我的账户',
                        url: '/mine/total'
                    }
                ],
                '/mine/editpwd': [
                    businessJSON, {
                        url: '/mine/total',
                        name: '我的账户',
                    }
                ],
                // =============================  修改密码相关
                '/resetpassword1': [{
                    url: '/home',
                    name: '首页'
                }, {
                    url: '/resetpassword1',
                    name: '重置密码',
                }],
                '/resetpassword2': [
                    businessJSON, {
                        url: '/resetpassword2',
                        name: '重置密码',
                    }
                ],
            };
            return NAV_CONFIG;
        }
    }
};

export default NavConfigFactory;