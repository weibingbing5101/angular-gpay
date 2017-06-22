/**
 * @type {module|angular.Module}
 */

/**
 * 数据服务层
 */
import services from '../services';


import home from './home';	//首页		

export default  angular.module('app.components', [
    home.name
]);