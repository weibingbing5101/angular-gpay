// 公共接口
import api from './api';
import commonSvc from "./commonSvc";
import enumSvc from "./enumSvc";
// 各模块私有接口
<% for(var i=0,svc;svc=services[i];i++){ %>
import <%= svc.appname %>Svc from './<%= svc.appname %>Svc'; 
<% } %>


export default angular
  .module('app.services', [
      api.name
  ])
  .service({
  	commonSvc,
    enumSvc,
    <% for(var i=0,svc;svc=services[i];i++){ %>
      <%= svc.appname %>Svc,
    <% } %>
  });
