class Controller {
    constructor(appSvc, $location, $timeout, $filter) {
        'ngInject';
        this.name = 'appinforobj';
        this.$location = $location;
        this.appSvc = appSvc;
        this.$filter = $filter;
        this.$timeout = $timeout;

        this.timer = null;

        this.isEditAppName = false;
        this.appName = ''; // 双向数据绑定的值
        this.appNameClass = 'default';

        let that = this;
        //删除应用时弹框提示
        this.isShowWindow = false;
        this.text = '您确定要删除该应用吗？';
        this.canceltext = '取消';
        this.confirmtext = '确定';
        this.confirm = function() {
            let params = { appId: that.$location.search() && that.$location.search().appId };
            that.appSvc.disableApp(params)
                .then(data => {
                    that.$location.url('/business/businesshome');
                }, err => {

                });
        }
        this.cancel = function() {
            that.isShowWindow = false;
        }

        // 提示JSON
        this.tipsJson = {
            default: '(果仁宝客户端上展示的应用名称，请输入40字符内的名称)',
            b40: '请输入40字符内的名称',
            success: '应用名称更新成功',
        };
        this.tips = this.tipsJson.default;

        // 展示的字段
        this.appInfor = {
            appId: '', // 应用标识
            md5Key: '', // md5Key
            appName: '', // 应用名称
            appType: '', // 应用类型 接口返回为汉字 
            appDesc: '', // 描述
            iconUrl: '', // 应用icon
        }
        this.isCreateApp = localStorage.appNum >= 10;
        this.init();
    }

    init() {
        let params = {
            appId: this.$location.search() && this.$location.search().appId
        };
        this.appSvc.
        getAppInfor(params)
            .then((data) => {
                // console.log('应用信息查询成功');
                // console.log(data);
                if (data.code === 0) {
                    this.appInfor = data.object;
                    this.appName = this.appInfor.appName //.substrfirst20();
                } else {
                    console.log(data.msg);
                }
            }, (data) => {
                console.log('应用信息查询失败');

            });
    };

    // 修改APP名称
    editAppNameFN() {
        if (!this.isEditAppName) {
            return;
        }

        let params = {
            appId: this.$location.search() && this.$location.search().appId,
            appName: this.appName
        };


        this.$timeout.cancel(this.timer);
        this.appSvc.
        editAppName(params)
            .then((data) => {
                if (data.code === 0) {
                    this.tips = this.tipsJson.success;
                    this.appNameClass = 'ok';
                    this.appInfor.appName = this.appName;
                    this.$location.url('/app/infor?appId=' + params.appId + '&appName=' + encodeURIComponent(params.appName));
                    // console.log(decodeURIComponent(this.$location.url()));
                } else {
                    this.tips = data.msg;
                    this.appNameClass = 'no';
                }
                this.isEditAppName = false;
                this.timer = this.$timeout(() => {
                    this.tips = this.tipsJson.default;
                    this.appNameClass = 'default';
                }, 3000);
            }, (data) => {
                this.tips = this.tipsJson.faild;
                this.isEditAppName = false;
                this.timer = this.$timeout(() => {
                    this.tips = this.tipsJson.default;
                    this.appNameClass = 'default';
                }, 3000);
            });
    };

    // 修改APP名称 input changefn
    nameChangeFN() {
        this.isEditAppName = (this.appName != this.appInfor.appName) && this.appName.length && this.appName.gblen() <= 40 ? true : false;
        if (this.appName.gblen() > 40) {
            this.tips = this.tipsJson.b40;
            this.appNameClass = 'no';
        } else {
            this.tips = this.tipsJson.default;
            this.appNameClass = 'default';
        }
    };

    //删除应用
    deleteApp() {
        let that = this;
        // 先查APP状态
        let params = {
            appId: this.$location.search() && this.$location.search().appId
        };

        this.appSvc.queryAppIsFrozen(params).then((data) => {
            if (data && data.code === 0) { // APP状态可用 
                that.isShowWindow = true;
            }
        }, (data) => {

        });
    }
};


export default Controller;
