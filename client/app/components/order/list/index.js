import listComponent from './component';
export default angular.module('orderList', []) // 1、module组件名  其它组件引入时的名字
    .config(($stateProvider) => { //路由配置
        "ngInject";
        $stateProvider.state('orderlist', { // 无实际意义 只做key值使用
            url: '/order/list', // 路由参数      router
            template: '<orderlist></orderlist>' // 路由下显示的  html   标签
        });
        $stateProvider.state('orderHome', { // 无实际意义 只做key值使用
            url: '/order/home', // 路由参数      router
            template: '<orderlist></orderlist>' // 路由下显示的  html   标签
        });
    })
    .component('orderlist', listComponent) // 与 标签名 相同

.filter('fromText', function() { // 支付渠道
    return function(fromType) {
        return ['移动支付', '移动支付', '移动支付'][fromType];
    }
})
.filter('payStatusText', function() { // 订单支付状态
    return function(payStatus) {
        return ['未支付', '已支付'][payStatus];
    }
})
.filter('orderList_RefundStatusText', function() { // 退款状态
    return function(refundStatus) {
        return ['无退款', '有退款'][refundStatus];
    }
}).filter('numPoint2', function() { // 退款状态
    return function(num) {
        let num1 = '' + num;

        // 有小数点  且小数倍数为 1 位   (parseInt(num * 100) / 100)
        if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 1) { // 1 位小数
            return num1 + '0';
        } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length === 2) { // 2 位小数
            return num1;
        } else if (num1.indexOf('.') != -1 && num1.substr(num1.indexOf('.') + 1).length > 2) { // 2 位以上小数
            return parseInt(parseFloat(num1) * 100) / 100;
        } else if (num1.indexOf('.') === -1) { // 整数
            return (num1 + '.00');
        }
    }
}).filter('timeformate', function() { // 2016-07-15 09:22:43
    return function(time) {
        if (!time) {
            return '                   ';
        }
        if (time === 'noPayMent') {
            return '等待支付...';
        }
        let timeNum = parseFloat(time);
        let oDate = new Date();
        oDate.setTime(timeNum);
        return (
            oDate.getFullYear() + '-' +
            (oDate.getMonth() + 1 < 10 ? ('0' + (oDate.getMonth() + 1)) : oDate.getMonth() + 1) + '-' +
            (oDate.getDate() < 10 ? ('0' + oDate.getDate()) : oDate.getDate()) + ' ' +
            (oDate.getHours() < 10 ? ('0' + oDate.getHours()) : oDate.getHours()) + ':' +
            (oDate.getMinutes() < 10 ? ('0' + oDate.getMinutes()) : oDate.getMinutes()) + ':' +
            (oDate.getSeconds() < 10 ? ('0' + oDate.getSeconds()) : oDate.getSeconds())
        )
    }
}).filter('ymdformate', function() { // 2016-07-15 09:22:43
    return function(time) {
        if (!time) {
            return '                   ';
        }
        let timeNum = parseFloat(time);
        let oDate = new Date();
        oDate.setTime(timeNum);
        return (
            oDate.getFullYear() + '-' +
            (oDate.getMonth() + 1 < 10 ? ('0' + (oDate.getMonth() + 1)) : oDate.getMonth() + 1) + '-' +
            (oDate.getDate() < 10 ? ('0' + oDate.getDate()) : oDate.getDate())
        )
    }
}).filter('gopPoint3', function() { // 退款状态
    return function(num) {
        let numn = parseFloat(num);
        let knum = '0.000';
        if (numn !== 0) {
            knum = (parseInt(num * 1000) + 1) / 1000;
        }
        return knum;
    }
}).filter('spaceStyle', ['$sce',function($sce) { // 显示html中的空格
    return function(str) {
        if(!str){
            return '';
        }
        let changedStr = '';
        for(var i=0; i< str.length; i++){
            if(str.charAt(i) === ' '){
                changedStr+='&nbsp;';
            }else{
                changedStr+= str.charAt(i);
            }
        }
        return $sce.trustAsHtml(changedStr ? changedStr : '');
    }
}]);
// 此index.js主要 配置组件
