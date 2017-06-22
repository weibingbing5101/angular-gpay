class Controller {
  constructor($rootScope, $cookies, $scope, $location, pathConfigFactory) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$location = $location;
    this.$cookies = $cookies;
    this.PATH_CONFIG = pathConfigFactory.getData();

    this.headerType = 0;
    this.name = 'header';
    this.email = '';
    this.showSelect = false;

    // 保存的URL
    this.preQuery = null;

    this.addListener();
    this.images = {
      mmenu: require('./images/m-menu.png'),
      mmine: require('./images/m-mine.png'),
      gplogo: require('./images/gplogo.png'),
      mgplogo: require('./images/m-gplogo.png'),
      // bblogo: require('./images/bblogo.png'),
      selectlogo: require('./images/selectlogo.png'),
    };

    this.needAppidURL = ['/app/desc', '/order/home', '/order/list', '/order/refund', '/order/settlement', '/app/infor', '/sheet/download'];

    let that = this;
    this.addEvent(document, 'click', function() {
      if (that.showSelect) {
        that.showSelect = false;
        that.$scope.$apply();
      }
    });


    // 判断当前路径是否需要登陆或是否存在  false不跳登陆  true跳登陆
    this.path = {
      '/home': false,
      '/low': false,
      '/resetpassword1': false,
      '/resetpassword2': false,


      '/business/businesshome': true,
      '/app/create': true,
      '/app/desc': true,
      '/app/infor': true,
      '/mine/editpwd': true,
      '/mine/infor': true,
      '/mine/total': true,
      '/order/list': true,
      '/order/refund': true,
      '/order/settlement': true,
      '/sheet/download': true,

    };

    /*
    this.$rootScope.$on('isshowsheet', function(event, data) {
        if (data.isshow) {
            that.isshowsheet = data.isshow;
        }
    });
    */
  };

  isNeedAppidURL(path) {
    return this.needAppidURL.some((v, i, a) => {
      return v == path;
    });
  };

  gotoMine() {
    this.$location.url('/mine/total');
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  parseQuery(url) {
    let ret = {};
    let a = document.createElement('a');
    a.href = url;
    if (a.hash) {
      let b = document.createElement('a');
      b.href = a.hash.replace(/^#/, '');
      if (b.search) {
        let seg = b.search.replace(/^\?/, '').split('&'),
          len = seg.length,
          i = 0,
          s;
        for (; i < len; i++) {
          if (!seg[i]) {
            continue;
          }
          s = seg[i].split('=');
          ret[s[0]] = s[1];
        }
      }
    };
    return ret;
  };

  changePathClass(path) {
    let body = document.body;
    if (body.classList) {
      let classList = body.classList;
      let prePathClassName = this.pathClassName;
      if (prePathClassName) {
        classList.remove(prePathClassName);
      }
      if(path && (path = path.replace(/^\//, '')) ){
        path = path.split('/').join('-');
      }else{
        path = 'home';
      }
      path = 'path-'+path;
      classList.add(path);
      this.pathClassName = path;
    }
  }

  addListener() {
    const PATH_CONFIG = this.PATH_CONFIG;
    // $locationChangeStart hash变化后 页面变化前 给需要的页面添加APPID 和 APPNAME
    this.$rootScope.$on('$locationChangeStart', function(event, toState, fromUrl) {
      // 当前路径 
      // decodeURIComponent() // ==> 乱码 转  中文
      // encodeURIComponent()//  ==> 中文 转  乱码
      let path = this.$location.path();
      let curSearch = this.$location.search();

      this.changePathClass(path);



      //  判断当前路径是否需要APPID APPNAME
      if (this.isNeedAppidURL(path)) {
        // 判断当前有的情况
        if (curSearch && curSearch.appId && curSearch.appName) {

        } else {
          // 当前没有   94行 此处 fromQuery.appName 是乱码
          let fromQuery = this.parseQuery(fromUrl);

          // 码乱转成中文后再加入URL
          fromQuery.appName = decodeURIComponent(fromQuery.appName);
          // console.log(fromQuery); // Object {appId: "GAPP_A0C467242C04A7F9"}
          this.$location.replace(path).search({
            appId: fromQuery.appId,
            appName: fromQuery.appName
          });
        }
      };

      if (path === '/low') {
        this.$location.url('/home');
      }

      if (['/home', '/', ''].indexOf(path) > -1) {
        //this.headerType = document.body.getBoundingClientRect().width > 800 ? 0 : 2;
        this.headerType = 0;
        //window.onresize = this.winOnResize.bind(this);
      } else {
        window.onresize = null;
        this.headerType = (path && PATH_CONFIG[path]) || 0;
        this.email = this.$cookies.get('email');
      }


      // 判断当前路径是否需要登陆或是否存在  false不跳登陆  true跳登陆
      // 没有token 并要登陆的页面
      if (this.path[this.$location.path()] && !this.$cookies.get('token')) {
        this.$location.url('/home');
      } else {
        console.log('不需要登陆 或 有token');
      }



    }.bind(this));

    this.$rootScope.$on('$locationChangeSuccess', function() {
      document.body.scrollTop = 0;
    });
  };

  winOnResize() {
    // 暂时去掉响应式，by 刘炳礼
    /*let headerType = document.body.getBoundingClientRect().width > 800 ? 0 : 2;
    if (headerType != this.headerType) {
      this.headerType = headerType;
      this.$scope.$apply();
    }*/
  };

  isShowSelect($event) {
    this.showSelect = true;
    $event.stopPropagation();
  };

  addEvent(obj, sEv, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(sEv, fn, false);
    } else {
      obj.attachEvent('on' + sEv, fn);
    }
  }
  exitFN() {
    
  }
  changeToHome() {
    this.$location.url('/home');
  }
}

export default Controller;