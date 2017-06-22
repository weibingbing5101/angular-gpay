export default angular
    .module('app.api', [])
    .factory('Api', function($http, $cookies, $q, $httpParamSerializerJQLike, $rootScope, $location) {
        'ngInject';
        this.$location = $location;


        var api = {};

        api.testData = function(data) {
            var deferred = $q.defer();
            deferred.resolve(data)
            return deferred.promise;
        }

        var basePath = function() {
            var url = 'https://merbe.goopal.com.cn/pay-merchant-op/';
            if (process && process.env && process.env.NODE_ENV) {
                switch (process.env.NODE_ENV) {
                    case 'dev':
                        // url='http://10.23.0.128:9014/pay-merchant-op/'; //高羽本地服务器
                        url = 'http://172.16.33.8:9014/pay-merchant-op/'; //Linux服务器
                        //url = 'http://merop.goopalpay.pri/pay-merchant-op/';
                        break;
                    case 'test':
                        url = 'http://172.16.33.8:9014/pay-merchant-op/'; //Linux服务器
                        break;
                    case 'sit':
                        url = 'http://merop.goopalpay.pri/pay-merchant-op/'; // 测试环境
                        break;
                    case 'sandbox':
                        url = 'http://merbe.sandbox.treespaper.com/pay-merchant-op/'; // 测试环境
                        break;
                    case 'prod':
                        url = 'https://merbe.guorenbao.com/pay-merchant-op/'; // 正式环境
                        break;
                }
            }
            return url;
        };

        api.get = function(url, params) {
            var deferred = $q.defer();
            $http({
                url: basePath() + url,
                method: 'get',
                params: params || {}
            }).then(function(baseResult) {
                console.log(baseResult);
                if (baseResult.status === 200) {
                    baseResult.data ? deferred.resolve(baseResult.data) : console.log('无data返回数据');
                } else {
                    console.log('请求回馈非200状态');
                }
            }, function(baseResult) {
                deferred.reject(baseResult);
                // var httpError = 'httpError~';
                // console && console.log(httpError);
                // deferred.reject(httpError + ':' + baseResult.status + ',' + baseResult.statusText);
            })
            return deferred.promise;
        };

        api.post = function(url, params) {
            console.log("api:"+params)
            var deferred = $q.defer();
            setTokenInParams(params, url);
            $http({
                url: basePath() + url,
                data: $httpParamSerializerJQLike(params),
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(baseResult) { // baseResult  http返回的对象
                // console.log(baseResult);
                if (baseResult.status === 200) {
                    setTokenTime();
                    baseResult.data ? deferred.resolve(baseResult.data) : console.log('无data返回数据');
                    loginAgain(url, baseResult.data);
                } else {
                    console.log('请求回馈非200状态');
                }
            }, function(baseResult) {
                console.log(baseResult);
                deferred.reject(baseResult);
               
            });

            return deferred.promise;
        };
        // 通过url   get方式获取验证码
        api.getUrlCode = function(url, params) {
            let returnURL = basePath() + url + '?';
            /*
            for (let key of Object.keys(params)) {
                returnURL += key + '=' + params[key] + '&';
            }
            */
            for (var key in params) {
                returnURL += key + '=' + params[key] + '&';
            }
            return returnURL + '' + Math.random() + '' + Math.random();
        };

        api.basePath = basePath();

        // 需要登录true 不需要登录false
        let list = {
            'login': false,
            'isNeedCode': false,
            'code': false,
            'sendEmail': false,
            'resetPwd': false,
            'modifyPwd': true,
            'uploadAppImage': true,
            'createApp': true,
            'queryBankCard': true,
            'queryAppType': true,
            'querySpecifiedApp': true,
            'modifyAppName': true,
            'queryBasicInfo': true,
            'merchantAppInfo': true,
            'merchantAppOrder': true,
            'refundOrder': true,
            'refundOperation': true,
            'settlementList': true,
            'reportDownload': true,
            'queryAppSumInfo': true,
            'accountView': true,
            'isHasFile': true,
            'disableApp': true,
            'getTradeChart': true,
            'queryAppCreateTime': true,
            'viewOrderDetail': true,
            'viewRefundDetail': true,
            'logout': true,
            'queryAppIsFrozen': true
        };

        /*
         *token为空时，弹出重新登录窗口
         */
        var setTokenInParams = function(params, url) {
            if (list[url]) {
                let token = $cookies.get('token');
                params.token = token;
                // if (token) {
                //     params.token = $cookies.get('token');
                // } else {
                //     $rootScope.$emit('changeConfirm', {
                //         text: '由于您已经长时间未操作，该页面已过期请重新登录后查看',
                //         confirmtext: '重新登录',
                //         show: true,
                //         code: 2                       
                //     });
                // }
            }
        };
        /*
         *更新token的过期时间
         */
        var setTokenTime = function() {
                let expireTime = new Date();
                expireTime.setFullYear(2046); //token 15分钟后过期,在服务器进行判断，客户端不做处理
                let tokenInfo = $cookies.get('token');
                $cookies.remove('token');
                $cookies.put('token', tokenInfo, {
                    'expires': expireTime
                });
            }
            /*
             *返回错误码（code==2）时，弹出重新登录窗口
             */
        var loginAgain = function(url, data) {
            let json = {
                text: '',
                confirmtext: '',
                show: ''
            };
            if (data) {
                switch (data.code) {
                    case 0:
                        json.text = '';
                        json.confirmtext = '';
                        json.show = false;
                        break;
                    case 2: // 会话过期   知道了  首页链接  清掉token
                        json.text = '由于您已经长时间未操作，该页面已过期请重新登录后查看';
                        json.confirmtext = '知道了';//'';
                        json.show = true;
                        json.code = 2;
                        break;
                    case 4: //应用冻结   确定  商户应用首页链接
                        json.text = data.msg;
                        json.confirmtext = '确定';
                        json.show = true;
                        json.code = 4;
                        break;
                    case 5: //登录受限冻结2小时    知道了  关闭对话框
                        json.text = data.msg; 
                        json.confirmtext = '知道了';
                        json.show = true;
                        json.code = 5;
                        break;
                    case 6: // 帐户不存在、删除、未激活    返回首页   首页链接   有input时tips提示
                        json.text = data.msg;
                        json.confirmtext = '返回首页';
                        json.show = true;
                        json.code = 6;
                        break;
                    case 8: // 弹框系统繁忙    确定   关闭    有input时tips提示  (用处：首页忘记密码跳转)   
                        json.text = data.msg;
                        json.confirmtext = '确定';
                        json.show = true;
                        json.code = 8;
                        break;
                    // case 9: // 链接失效 (重置密码)  自主义
                    //     json.text = data.msg;
                    //     json.confirmtext = '返回首页';
                    //     json.show = true;
                    //     json.code = 9;
                    //     break;
                    case 10: // 修改、重置密码操作过于频繁，请明日再试    知道了    关闭    (首页忘记密码跳转)
                        json.text = data.msg;
                        json.confirmtext = '知道了';
                        json.show = true;
                        json.code = 10;
                        break;
                }
                // json.text = '模拟接口数据弹框类!!!';
                // json.code = 4;
                // json.show = true;
                // data.msg = '111111';
                console.log(json);
                //code为4、5、6时，弹窗显示一个按钮无关闭按钮 传送给popspecial的数据 
                $rootScope.$emit('changeConfirm', {
                    show: json.show,
                    text: json.text,
                    code: json.code,
                    confirmtext: json.confirmtext
                });
            }
        };

        api.loginAgain = loginAgain;
        return api;
    });
