class Controller {
    constructor($rootScope, $scope, $cookies,$location, businessHomeInfoSvc) {
        'ngInject';
        this.name = 'businesshome';
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.businessHomeInfoSvc = businessHomeInfoSvc;
        this.appInfo = [];
        this.currency=$cookies.get('currency');
        this.appInfo = [
            // {
            //     appId:'1',
            //     appIcon: './appicon.png',
            //     appNameNew: '应用名称',
            //     appName:'11',
            //     ordrsTday:111,
            //     amtTday:111,
            //     gopAmountTday:0,
            //     ordrsYstdy:1111,
            //     amtYstdy:1111,
            //     gopAmtYstdy:0
            // }
        ];

        // 显示app是否冻结
        this.alertData = {
            title:'',
            conText:'该应用存在风险操作，已被系统冻结，如有疑问请咨询客服',
            buttonText:'确定',
            isAlertShow: false,
            clickFn:()=>{
                this.alertData.isAlertShow = false;
            }
        };
        
        this.init();
    };
    init() {
        this.getAllAppInfo();
    };
    getAllAppInfo() {
        let params = {};
        this.businessHomeInfoSvc
            .getAllAppInfo(params)
            .then((data) => {
                console.log('查询应用信息成功');
                for (let item in data.object) {
                    data.object[item].appNameNew = data.object[item].appName;
                    if (data.object[item].appNameNew.gblen()>20) {
                        data.object[item].appNameNew = data.object[item].appNameNew.substrfirst20()+'...';
                    }
                    
                    data.object[item].amtTday = data.object[item].amtTday.toLocaleString();
                    data.object[item].amtYstdy = data.object[item].amtYstdy.toLocaleString();
                    data.object[item].gopAmountTday = data.object[item].gopAmountTday.toLocaleString();
                    data.object[item].gopAmtYstdy = data.object[item].gopAmtYstdy.toLocaleString();
                    this.appInfo.push(data.object[item]);
                }
                
                let showsheet = this.appInfo.length > 0 ? true : false;
                this.$rootScope.$emit('isshowsheet', {
                    isshow: showsheet
                });
                localStorage.appNum = this.appInfo.length;  //记录创建的app数量
            }, () => {
                console.log('查询应用信息失败');
            });
    };
    jumpAppDesc(item) {
        let params = {appId:item.appId};
        this.businessHomeInfoSvc
            .queryAppIsFrozen(params)
            .then( data =>{
                if (data.code==0) {
                    this.$location.url('/app/desc?appId=' + item.appId + '&appName=' + encodeURIComponent(item.appName));
                }
            },()=>{
                console.log('获取失败');
            });
    };
    createApp() {
        this.$location.url('/app/create');
    };

};
export default Controller;