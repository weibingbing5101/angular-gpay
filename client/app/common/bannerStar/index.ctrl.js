import Star from './star';


class Controller {
    constructor($rootScope, $location, navConfigFactory) {
        'ngInject';
        	Star(document.getElementById('banner-star'));
        
    }
}

export default Controller;