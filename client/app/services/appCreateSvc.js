/**
 * author liubingli
 * 应用相关接口
 * 充值密码相关接口
 */
export default class appCreateSvc {
    constructor(Api,$cookies,Upload){
        'ngInject';
        this.Api = Api;
        this.Upload = Upload;
        this.$cookies = $cookies;
    }

    /**
     * 上传服务
     */
  upload(options){
      return this
          .Upload
          .upload({
              url: this.Api.basePath + 'uploadAppImage?token='+this.$cookies.get('token'),
              headers: {
                enctype:'multipart/form-data',
              },
              data:options,
          }).then(data=>{
              let result = data && data.data;
              let status = data && data.status;
              if(result.code == 0){
                let errorMsg = result && result.msg;
                if(status != 200){
                  console.log('错误信息',errorMsg);
                  return;
                }else{
                  return result;
                }
              }else{
                console.log('错误信息:',data);
                this.Api.loginAgain('#',result);
              }
          });
  }
  add(params){
    return this.Api.post('createApp',params);
  }
  
}