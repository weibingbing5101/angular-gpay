class Controller {
    constructor($rootScope, $scope, $location) {
        'ngInject';
        this.name = 'experiencecenter';
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.payWay = 'mobileNet';
        
        this.init();
    }

    init() {
    	this.text = 'https://cashier.guorenbao.com/create_order';
    	this.size = 200;
 
    }

    selectPayWay(value){
    	this.payWay = value;
    }
    
};
export default Controller;