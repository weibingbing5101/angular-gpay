class Controller {
	constructor($scope) {
		'ngInject';
		this.scope = $scope;
		this.name = 'alert';
		
	};
	alertClose(isCbfn){
		this.gyisshow = false;
		if(isCbfn){
			this.gyclickfn && this.gyclickfn();
		}
	};
}
export default Controller;