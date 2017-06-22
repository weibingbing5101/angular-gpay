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
		this.formData = {};
		this.formFileds = <%= JSON.stringify(query.params) %>;

		this.init();

	}

	/**
	 * @return {null}
	 */
	init() {

		this.resetForm();

	}

	submit() {
		let formData = this.getSubmitFormData();
		<%= 'this.'+camelModuleName+'Svc' %>
			.<%= appname %>(formData)
			.then(data => {
				alert('成功');
			});
	}

	/**
	 * @returns {{}} form数据集合
	 */
	getSubmitFormData() {
		let formData = this.formData,
			sendFormData = {
			};

		$.extend(sendFormData, formData);

		return sendFormData;
	}

	/**
	 * 重置
	 */
	resetForm() {
		let formData = this.formData;

		Object.keys(formData).forEach(function(key){
			formData[key] = '';
		})
	}
}

export default <%= upCaseAppname+'Controller' %>;