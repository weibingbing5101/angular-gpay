class Controller {
	constructor($scope, $location) {
		'ngInject';
		this.$location = $location;
		this.images = {
			process: require('./images/process.png'),
			app_img1:require('./images/app_1.png'),
			app_img2:require('./images/app_2.png'),
			app_img3:require('./images/app_3.png'),
			app_img4:require('./images/app_4.png'),
			app_img5:require('./images/app_5.png'),

			h5_img1:require('./images/h5_1.png'),
			h5_img2:require('./images/h5_2.png'),
			h5_img3:require('./images/h5_3.png'),
			h5_img4:require('./images/h5_4.png'),			
			businessrule:require('./images/businessrule.png')
		}

		this.init();
	};
	init() {
		
	};
}

export default Controller;