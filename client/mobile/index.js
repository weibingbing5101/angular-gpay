import angular from 'angular';
import uiRouter from 'angular-ui-router';
import index from './index.less'; //初始化CSS
import Common from './common'; //引入 公用组件集 入口 
import Components from './components'; //引入 组件集 入口 
import AppComponent from './mobile.component'; // 最外层的组件
import angularCookies from 'angular-cookies'

angular.module('app', [
    uiRouter,
    angularCookies,
    Common.name,
    Components.name
])
.constant('baseTool', {
    isPhone: function(){
       return /android|ipad|iphone/i.test(navigator.userAgent);
    }
})
.component('mobile', AppComponent);