import angular from 'angular';
import uiRouter from 'angular-ui-router';
import restCss from './app.less'; //初始化CSS
import Common from './common/common'; //引入 公用组件集 入口 header footer input
import Components from './components/components'; //引入 组件集 入口     app.order
import AppComponent from './app.component'; //引入app组件化的相关配置 
import ffanNgtable from 'gy-ng-table';
import angularCookies from 'angular-cookies';
import ngSanitize from 'angular-sanitize';
import oclazyload from 'oclazyload';
import './lib/three';


angular.module('app', [
    ffanNgtable.name,
    uiRouter,
    oclazyload,
    Common.name,
    angularCookies,
    Components.name, // app.order  ng模块的名字
])

.constant('$menuConstant', {
    DEBUG: process.env.DEBUG
})

.constant('baseTool', {
    isPhone: function(){
       return /android|ipad|iphone/i.test(navigator.userAgent);
    }
})

.component('app', AppComponent); //ng 组件化