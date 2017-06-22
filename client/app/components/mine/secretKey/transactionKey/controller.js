class Controller {
	constructor($scope,mineSvc,$sce,$cookies) {
		'ngInject';
		this.$scope=$scope;
		this.$sce = $sce;
		this.$cookies=$cookies;
		this.name = 'minetranscationKeyobj';
		this.mineSvc = mineSvc;
		this.showInfor = false;
		this.MD;
		this.RSA='';
		this.RSAfirst='';
		this.editRSAPermit=false;
    this.success=false;
    this.successContext='';
		this.gydisval = this.$sce.trustAsHtml('用于识别商户的唯一标识，由果仁支付自动分配的16位数字')
		console.log(this.gydisval);

		this.init();
	};
     inputChangeFN(){
     	console.log("this.RSAfirst:"+this.RSAfirst)
     	console.log("this.RSA:"+this.RSA)
     	
     	 if(this.RSA===this.RSAfirst ||this.RSA==='' )
            this.editRSAPermit=false;
         else 
         	this.editRSAPermit=true;
     }
    
     saveRSA(){
       	   this.token=this.$cookies.get('token');
       	   this.formdata={'token':this.token,'tradeKey':this.RSA};
           this.mineSvc.saveTradeKey(this.formdata).then(
                 data=> {
                  if(data.code===0){
                     this.success=true;
                     this.successContext="密钥设置成功";
                     this.RSAfirst=this.RSA;
                    
                    // $window.location.reload();
                  }
                 }
            )
          
     }
     updateRSA(){
     	   console.log("---this.editRSAPermit:"+this.editRSAPermit)
     	   if(!this.editRSAPermit)
     		  return;
           this.token=this.$cookies.get('token');
       	   this.formdata={'token':this.token,'tradeKey':this.RSA};
           var s =this.mineSvc.updateTradeKey(this.formdata);

           s.then(
                 data=> {
                  console.log("----code:"+data.code)
                  if(data.code===0){
                     this.success=true;
                     this.successContext="密钥修改成功"
                     console.log("----success:"+this.success)
                  }
                 }
            )
           this.RSAfirst=this.RSA;
           this.editRSAPermit=false;          
       }

       successBtn(){
        this.success=false; 
       }

	init() {
		console.log("key-token:"+this.$cookies.get('token'))
		this.tok={token:this.$cookies.get('token')};
		this.mineSvc.queryMD(this.tok).then(
                  (data) => {
                  	console.log(data)
                  	this.MD=data['object'];
                  	this.RSA=data['object']['rsa'];
                  	this.RSAfirst=data['object']['rsa'];
                  })	
	};
};

export default Controller;