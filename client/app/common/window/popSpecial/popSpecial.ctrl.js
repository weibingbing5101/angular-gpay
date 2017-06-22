class Controller {
    constructor($rootScope, $location, $cookies) {
        'ngInject';

        this.$location = $location;

        this.name = 'popSpecial';
        this.isShow = false;

        this.text = '';
        this.confirmtext = '';
        this.canceltext = '取消';


        let that = this;
        // 接收api     $rootScope.$emit('changeConfirm',{});
        $rootScope.$on('changeConfirm', function(event, data) {
            if (data.show) {
                that.isShow = data.show;
                that.text = data.text;
                that.confirmtext = data.confirmtext;
                // code 2返回首页 清token

                // 弹窗  单按钮显示
                if (data.code === 2 || data.code === 4 || data.code === 5 || data.code === 6 || data.code === 8 || data.code === 10) {
                    that.canceltext = '';
                }

                if (data.code === 4) { // 商户应用首页链接
                    that.confirm = function() {
                        that.isShow = false;
                        that.$location.url('/business/businesshome');
                    }
                } else if (data.code === 5 || data.code === 8 || data.code === 10) { // 关闭弹窗
                    that.confirm = function() {
                        that.isShow = false;
                    }
                } else if (data.code === 2 || data.code === 6) {   // 清掉token 跳转首页
                    that.confirm = function() {
                        that.isShow = false;
                        if ($cookies.get('token')) {
                            $cookies.remove('token');
                        }
                        that.$location.url('/home');
                    }
                }
            }

        });
        this.confirm = function() {
            that.isShow = false;
            if ($cookies.get('token')) {
                $cookies.remove('token');
            }
            that.$location.url('/home');
        }
        this.cancel = function() {
            that.isShow = false;
        }

    }

}

export default Controller;
