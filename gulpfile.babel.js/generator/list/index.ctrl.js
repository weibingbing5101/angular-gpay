/**
 * author liubingli
 */
class <%= upCaseAppname+'Controller' %> {
	/**
	 * @param  {Object} controller的私有作用域
	 * @param  {Object} 表格参数对象
	 * @param  {Object}	此controller的私有接口
	 * @param  {Object}	枚举类型接口
	 * @param  {Object}	公共接口
	 * @return {Object}
	 */
	constructor($scope, NgTableParams, <%= camelModuleName+'Svc' %>, enumSvc, commonSvc) {
		'ngInject';
		/**
		 * 注入的服务
		 */
		this.scope = $scope;
		this.NgTableParams = NgTableParams;
		<%= 'this.'+camelModuleName+'Svc' %> = <%= camelModuleName+'Svc' %>;
		this.enumSvc = enumSvc;
		this.commonSvc = commonSvc;
		this.filter = {};
		this.options = {};
		<% for(var i=0,param;param=query.params[i];i++){ %>
		<% if(param.type==='select'){ %>
			<%= helper.includeClassCons('select', {param: param} ) %>
	  <% }} %>

		this.init();

	}

	/**
	 * @return {null}
	 */
	init() {

		this.resetForm();

		this.searchList();
	}

	searchList() {
		this.tableParams = new this.NgTableParams(<%= JSON.stringify(tableParams, '', 2) %>, {
			getData: params => {
				let formData = angular.extend(this.getSearchFormData() || {}, {
					pageNo: ((params.url().page) - 1) * params.count()
				}, {
					pageSize: params.count()
				});
				return <%= 'this.'+camelModuleName+'Svc' %>
					.<%= appname %>(formData)
					.then(data => {
						params.total((data && data.totalCount) || 1); //帮你分几页
						return (data && data['list']) || [];
					});
			}
		});
	}

	/**
	 * @returns {{}} form数据集合
	 */
	getSearchFormData() {
		let filter = this.filter,
			formData = {
			};

		$.extend(formData, filter);

		return formData;
	}

	/**
	 * 重置
	 */
	resetForm() {
		let filter = this.filter;

		Object.keys(filter).forEach(function(key){
			filter[key] = '';
		})
	}
	<% if(apis&&apis.length){ %>
		<% for(var i=0,api;api=apis[i];i++){ %>
			<% if(!api.isDefault){ %>
	<%=api.name%>(params){
		<%= 'this.'+camelModuleName+'Svc' %>
		.<%= api.name %>(params)
		.then(data => {
			// 这次写具体业务逻辑
			<% if(api.type==='select'){ %>
			this.options.<%= api.key %>=data;
			<%}else{%>
			alert('接口返回正常');
			<%}%>
		});
	}
		<% }} %>
	<% } %>


}

export default <%= upCaseAppname+'Controller' %>;