class Controller {
    constructor($rootScope, $location, navConfigFactory) {
        'ngInject';

        this.name = 'breadNav';
        this.$location = $location;

        this.$rootScope = $rootScope;
        this.navConfigFactory = navConfigFactory;

        // this.items = this.navConfigFactory.getData(this.$location);

        this.addListener();
    }

    addListener() {
        // 页面发生改变前，给相应页面左上角的位置显示相应的URL
        this.$rootScope.$on('$locationChangeStart', function(event, toState) {
            this.items = this.navConfigFactory.getData(this.$location);

            let items = this.items;
            let path = this.$location.path();
            
            // 替换空格为&nbsp
            // for(var name in items){
            //     console.log(items[name]);
            //     for(var i=0; i<items[name].length; i++){
            //         items[name][i]['name'] = items[name][i]['name'] ? items[name][i]['name'].replace(' ','&nbsp') : '' ;
            //         console.log(items[name][i]['name']);
            //     }
            // }
            // 
            // console.log(items);
            // let path = (toState||'').split("#")[1];
            this.items = (path && items[path]) || [];

        }.bind(this));
    }
}

export default Controller;