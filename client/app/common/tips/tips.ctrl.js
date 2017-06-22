class Controller {
	constructor($scope, $timeout) {
		'ngInject';
		this.scope = $scope;
		this.timeout = $timeout;
		this.name = 'tips';
		this.showInfor = false;
		// this.gydisval
	};

	showInforFN() {
		this.showInfor = true;
	};
	hideInforFN() {
		this.showInfor = false;
	};

}
export default Controller;