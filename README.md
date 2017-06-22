# 如有问题请联系 我的qq 510137831

* npm install 安装依赖
* 技术栈 ng1x   ng-router  less  deferred.promise  es6
* dev 执行 npm start || gulp


## Build System
项目基于webpack gulp构建工作
全局安装 `sudo npm i -g gulp webpack eslint babel less karma karma-cli`

`Webpack` 处理文件依赖:
* 采用 `Babel` 编译js代码 ES6 to ES5 
* 用模块加载的方式加载html
* 编译less
* 动态编译刷新
* 改动模块热启动

`Gulp` 处理打包流程:
* 启动webpack流程
* 生成app模块模版

