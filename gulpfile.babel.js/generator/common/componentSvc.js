/**
 * author liubingli
 * 
 */
export default class <%= camelModuleName+'Svc' %> {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  };

  <% if(apis&&apis.length){ %>
    <% for(var i=0,api;api=apis[i];i++){ %>
  <%=api.name%>(params){
    return  this.Api.<%= api.method %>('<%= api.url %>', params);
  }
    <% } %>
  <% } %>

}