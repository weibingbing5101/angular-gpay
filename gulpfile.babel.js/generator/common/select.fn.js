<%=api.name%>(params){
	<%= 'this.'+camelModuleName+'Svc' %>
	.<%= api.name %>(params)
	.then(data => {
		// 这次写具体业务逻辑
		alert('接口返回正常');
	});
}