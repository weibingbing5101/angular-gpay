import AraleQRCode from './qrcodesrc';

class Controller {
    constructor($rootScope) {
        'ngInject';
        
        this.createQrcode();
    }

    createQrcode(){
    	var qrcode = new AraleQRCode({text:this.text,size:this.size});
    	document.getElementById('qrcodeTable').appendChild(qrcode);
    }
    
}

export default Controller;