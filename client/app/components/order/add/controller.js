/*
 *订单增加
 */
class orderAddController {
  constructor() {
    this.name = 'order/add';

    this.init();
  }
  init(){
  	this.resetForm();	
  }
  resetForm(){
    this.formData = {
      name: '',
      password:''
    };
  }
  add(){
  	console.log("add");
  	
  }
}

export default orderAddController;
