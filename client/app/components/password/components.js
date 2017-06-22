/**
 * 弹窗组件的模块的引入
 * @type {module|angular.Module}
 */
//import modalComponent from './modalComponent/component';

/**
 * 数据服务层
 */
// import services from '../services/services';

/**
 * 业务
 */

import resetpassword1 from './resetpassword1';							//重置密码 填写邮箱 发送验证码

import resetpassword2 from './resetpassword2';							//邮箱跳回 修改密码		
import accountactivate from './accountactivate';							//帐户激活	

export default  angular.module('resetpassword', [
    //modalComponent.name,
    resetpassword1.name,
    resetpassword2.name,
    accountactivate.name
]);