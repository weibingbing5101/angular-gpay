class Controller {
    constructor($timeout, baseTool) {
        'ngInject';

        this.name = 'homePage';
        this.images = {
            loginboxbottom: require('./images/login_box_bottom.png'),
            conlistitem1: require('./images/con_list_item1.png'),
            conlistitem2: require('./images/con_list_item2.png'),
            conlistitem3: require('./images/con_list_item3.png'),
            conliststep: require('./images/con_list_step.png'),
            conlisticon: [
                require('./images/con_list_icon0.png'),
                require('./images/con_list_icon1.png'),
                require('./images/con_list_icon2.png'),
                require('./images/con_list_icon3.png'),
                require('./images/con_list_icon4.png'),
                require('./images/con_list_icon5.png')
            ],
            mbanner: require('./images/m-banner.png'),
            marrow: require('./images/m-arrow.png'),
            conconcatlist: [
                require('./images/con_concat0.png'),
                require('./images/con_concat1.png')
            ],
            indentImg: '',
        };

    };

    init() {
       
        
    };

}
export default Controller;