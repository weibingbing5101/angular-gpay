/**
 * 组件入口文件
 */
import services from '../services';
<% for(var i=0,d;d=data[i];i++){ %>
import <%= d.appname %> from '.<%= d.path %>';
<% } %>

export default  angular.module('app.components', [
    services.name,
    <% for(var i=0,d;d=data[i];i++){ %>
		<%= d.appname %>.name,
		<% } %>    
]);