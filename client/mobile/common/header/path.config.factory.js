let PathConfigFactory = function() {

  let PATH_CONFIG_ARR = [
    // 用户不需要登陆的页面
    [
      '/resetpassword2',
      '/resetpassword1',
      '/home',

    ],
    // 用户需要登录的页面
    [
      '/business/businesshome',
      '/app/desc',
      '/app/create',
      '/sheet/download',


      '/mine/total',
      '/mine/infor',
      '/mine/editpwd',

      '/order/list',
      '/order/refund',
      '/order/settlement',

      '/app/infor',
      '/order/home',


    ],
    // 首页的头部
    [

    ]
  ]

  let PATH_CONFIG = {};

  PATH_CONFIG_ARR.forEach(function(list, index) {
    list.forEach(function(path) {
      PATH_CONFIG[path] = index;
    })
  });

  return {
    getData: function() {
      return PATH_CONFIG;
    }
  }
};

export default PathConfigFactory;