class appCreateController {
	constructor($scope, $location, appSvc, appTypeSvc, appCreateSvc, commonSvc, enumSvc) {
		'ngInject';
		/**
		 * 注入依赖的服务
		 */
		this.$scope = $scope;
		this.$location = $location;
		this.appSvc = appSvc;
		this.appTypeSvc = appTypeSvc;
		this.appCreateSvc = appCreateSvc;
		this.enumSvc = enumSvc;
		this.commonSvc = commonSvc;
		this.iconUrl = '';
		this.isshowappcreating = true;
		this.formError = {
			info: '图片格式不正确，请检查后重新上传',
			pics: ''

		};

		this.appTypeEnum = [
		{
			key:0,
			value:'全部类型'
		}];
		this.init();
	}
	init() {
		this.resetForm();
		this.searchType();
	}
	resetForm() {
		/**
		 * 表单信息
		 * @type {Array}
		 */
		this.formData = {
			name: '',
			appType: 1,
			description: '',
			pics: []
		};
	}
	searchType() {
		let params = {};
		this.appTypeSvc
			.getAppType(params)
			.then((data) => {
				if(data.code === 0){
					console.log('查询应用类型成功');
					for (let m in data.appType) {
						this.appTypeEnum.push({
							key: m,
							value: data.appType[m]
						});
					}
				}else if(data.code === 1){
					this.formError.pics = data.msg;
				}
			}, () => {
				console.log('查询应用类型失败');
			});
	}
		/**
		 * 图片上传前端错误catch
		 */
	catchErrFileError(errFile) {
		//上传数量总线制
		if (this.formData.pics && this.formData.pics.length > 1) {
			return {
				data: true,
				msg: '上传图片最大数量为1张'
			}
		}
		//本身错误信息
		let errInfo = {
			data: false,
			msg: ''
		};
		console.log(errFile);
		if (errFile && errFile.length > 0) {
			console.log(errFile[0]['$error']);
			switch (errFile[0]['$error']) {
				case 'pattern':
					errInfo = {
						data: true,
						msg: '上传的图片类型只能是 jpg,jpeg,png'
					};
					break;
				case 'minWidth':
					errInfo = {
						data: true,
						msg: '上传的图片最小宽高为 120*120'
					};
					break;
				case 'minHeight':
					errInfo = {
						data: true,
						msg: '上传的图片最小宽高为 120*120'
					};
					break;
				case 'maxWidth':
					errInfo={
						data: true,
						msg: '上传的图片最大宽高为 120*120'
					};
					break;
				case 'maxHeight':
					errInfo={
						data: true,
						msg: '上传的图片最大宽高为 120*120'
					};
					break;
				case 'maxSize':
					errInfo = {
						data: true,
						msg: '上传图片最大的值为1M'
					};
					break;
				default:
					break;
			}
			return errInfo;
		}
	}


	/**
	 * 上传图片
	 */
	uploadFiles(file, errFile) {
		/**
		 * 上传图片规则异常处理
		 * return {{粗暴弹出错误信息}}
		 */
		let errInfo = this.catchErrFileError(errFile);
		this.formError.pics = '';
		if (errInfo && errInfo['data']) {
			//this.formError.pics = this.formError.info;
			this.formError.pics = errInfo.msg
			return;
		}

		if (!!file) {
			let options = {
				iconUrl: file,
			};

			console.log(file)

			this.appCreateSvc
				.upload(options)
				.then(response => {
					if (response) {
						this.iconUrl = response.object;
						//this.iconUrl = response.
						/* 上传接口未提供读取本地图片 */
						var reader = new FileReader();
						reader.onload = function(e) {
							this.formData.pics.push({
								src: e.target.result
							});
						}.bind(this);
						reader.readAsDataURL(file);
						/* 上传接口未提供读取本地图片 */

						/* 上传接口未提供读取服务器给的图片地址 */
						/*this.formData.pics.push({
						  src: file
						});*/
						/* 上传接口未提供读取服务器给的图片地址 */
					}
				});
		};
	};
	/**
	 * 删除一个
	 * @param curIndex
	 */
	delCur(curIndex) {
			this.formData.pics.splice(curIndex, 1);
		}
		/**
		 * 上传图片的参数
		 * @returns {Array}
		 */
	setPicsParams() {
		let pics = this.formData.pics,
			picsName = [];
		angular.forEach(pics, (item) => {
			let url = item && item.src,
				picsLength = (url.split('/')).length;
			picsName.push(url.split('/')[picsLength - 1]);
		})
		return picsName;
	}
	add() {
		console.log(this.gyreturnval.key);
		this.formData.appType = this.gyreturnval.key;

		let params = {
			appName: this.formData.name,
			appType: this.formData.appType,
			appDesc: this.formData.description,
			iconUrl: this.iconUrl
		};
		console.log(params);

		this.appCreateSvc
			.add(params)
			.then((data) => {
				if (data.code===0) {
					console.log('创建成功');
					this.isshowappcreating = false;
				}else if (data.code===1) {
					this.formError.pics = data.msg;
				}
			});
	}

	setNameLength(len) {
		if (this.formData.name != undefined) {
			this.formData.name = this.setStrLength(this.formData.name,len);

		}
	}
	setDescLength(len) {
		if (this.formData.description != undefined) {
			this.formData.description = this.setStrLength(this.formData.description,len);
		}
	}
	setStrLength(str,len){
		let num=0;
		let strlen = str.length;
		for (let i = 0; i < strlen; i++) {
			let charCode = str.charCodeAt(i);
			if (charCode >= 0 && charCode <= 128) {
				num++;
			} else {
				num += 2;
			}
			if (num > len) {
				str = str.substring(0, i);
				break;
			}
		}
		return str;
	}
}

export default appCreateController;