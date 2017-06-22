export default angular
    .module('app.api', [])
    .factory('Api', function($http, $cookies, $q, $httpParamSerializerJQLike, $rootScope, $location) {
        'ngInject';
        this.$location = $location;


        var api = {};

        var basePath = function() {
            var url = 'https://merbe.goopal.com.cn/pay-merchant-op/';
            if (process && process.env && process.env.NODE_ENV) {
                switch (process.env.NODE_ENV) {
                    case 'dev':
                        //'http://10.23.0.128:9014/pay-merchant-op/'; //高羽本地服务器
                        url = 'http://172.16.33.8:9014/pay-merchant-op/'; //Linux服务器
                        url = 'https://merbe.goopal.com.cn/pay-merchant-op/';
                        break;
                    case 'sit':
                        url = 'http://merop.goopalpay.pri/pay-merchant-op/'; // 测试环境
                        break;
                    case 'prod':
                        url = 'https://merbe.goopal.com.cn/pay-merchant-op/'; // 正式环境
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
                // alert('请求失败，请重试111');
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
            'isHasFile': true
        };

        /*
         *token为空时，弹出重新登录窗口
         */
        var setTokenInParams = function(params, url) {
            if (list[url]) {
                let token = $cookies.get('token');
                if (token) {
                    params.token = $cookies.get('token');
                } else {
                    $rootScope.$emit('changeConfirm', {
                        show: true
                    });
                }
            }
        };
        /*
         *更新token的过期时间
         */
        var setTokenTime = function() {
                let expireTime = new Date();
                expireTime.setMinutes(expireTime.getMinutes() + 15); //token 15分钟后过期
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
            let json = {};
            if (data) {
                switch (data.code) {
                    case 0:
                        json.text = '';
                        json.confirmtext = '';
                        json.show = false;
                        break;
                    case 2:
                        json.text = '由于您已经长时间未登录，该页面已过期请重新登录后查看';
                        json.confirmtext = '重新登录';
                        json.show = true;
                        break;
                    case 4:
                        json.text = '您的账户存在风险，系统已冻结账户，如有疑问请咨询客服';
                        json.confirmtext = '返回首页';
                        json.show = true;
                        break;
                }
                $rootScope.$emit('changeConfirm', {
                    show: json.show,
                    text: json.text,
                    confirmtext: json.confirmtext
                });
            }
        };

        api.loginAgain = loginAgain;
        return api;
    });