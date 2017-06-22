class Controller {
	constructor($rootScope, $location) {
		'ngInject';

		this.name = 'footer';
		this.$rootScope = $rootScope;
		this.$location = $location;
		this.style = {};
		this.styleItem = {};
		this.setBackgroundColor();
	}
	setBackgroundColor() {
		// $locationChangeStart hash变化后 页面变化前
		this.$rootScope.$on('$locationChangeStart', function(event, toState, fromUrl) {
			let path = this.$location.path();
			if (['/home', '/', ''].indexOf(path) > -1 ) {
				this.style = {
						'background-color': '#212121'
					};
					this.styleItem = {
						'color': '#fff'
					};
				/*if (document.body.getBoundingClientRect().width > 800) {
					this.style = {
						'background-color': '#212121'
					};
					this.styleItem = {
						'color': '#fff'
					};
				} else {
					this.style = {
						'background-color': '#f1f1f1'
					};
					this.styleItem = {
						'color': '#212121'
					};
				}*/

			} else {
				this.style = {
					'background-color': '#f5f6f7'
				};
				this.styleItem = {
					'color': '#212121'
				};
			}
		}.bind(this));

	}
}

export default Controller;