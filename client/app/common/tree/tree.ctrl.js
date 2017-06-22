import angularUiTree from 'angular-ui-tree';

import menusData from './testdata/data';

let tool;

class CommonmenuController {
	constructor($location, $rootScope, $scope, $window, treeFactory, treeConfigFactory) {
		'ngInject';
		tool = treeFactory;

		this.$window = $window;
		this.$location = $location;
		this.$scope = $scope;
		this.name = 'commonmenu';
		this.menuDefault = require('./images/default-menu.png');
		this.closeMenuImg = require('./images/close-menu.png');
		this.loadingImg = require('./images/spin.gif');
		this.loading = true;
		let self = this;
		this.path = null;
		this.close = false;
		this.preExpandMenu = null;
		this.preExpandMenus = [];

		/*$scope.$watch('nodes', function(newNodes){

		});*/

		this.PATH_MENUS_CONFIG = treeConfigFactory.getData();
		this.prePathMenus = null;

		$rootScope.$on('$locationChangeStart', this._setPathMenus.bind(this));
		this._setPathMenus();

		//this._openAll();
	};

	_setPathMenus() {
		let path = this.$location.path(); //(this.$window.location.hash || '').substr(1);
		if (path && this.PATH_MENUS_CONFIG[path]) {
			let pathMenus = this.PATH_MENUS_CONFIG[path];
			if (pathMenus !== this.prePathMenus) {
				this.menus = this._filterMenus(pathMenus);
				this.prePathMenus = pathMenus;
				this._pathMatchMenus();
				this.loading = false;
			}
			// 不需要menu的path
		} else {
			this.menus = [];
		}
	};

	_filterMenus(arr, level = 0, parentIndex) {
		var that = this;
		arr.forEach(function(item, index) {
			item.id = (parentIndex ? parentIndex + '-' : '') + index;
			item.level = level;
			item.menuCollapsed = true;
			if (item.nodes) {
				that._filterMenus(item.nodes, level + 1, item.id);
			}
		})
		return arr;
	};

	/*_pathMatchMenus() {
		let path = '#' + this.$location.path();
		let menus = this.menus;
		let pathMenu = null;
		if (path !== this.path) {

			function _scan(datas) {
				return datas.some(function(data) {
					if (data.url && data.url === path) {
						pathMenu = data;
						return true;
					}
					if (data.nodes) {
						return _scan(data.nodes)
					}
					return false;
				});
			}
			_scan(menus);

			if (pathMenu) {
				this._expandMenu(pathMenu);
			};

			this.path = path;
		}
	};*/

	_pathMatchMenus() {
		let path = this.$location.path();
		path = {
			'/doc/detail/index': '/doc/detail/mpay',
			'/order/home': '/order/list',
			'/mine/secretKey/home': '/mine/secretKey/transcationKey'
		}[path] || path;
		let menus = this.menus;
		let pathMenu = null;
		if (path !== this.path) {

			function _scan(datas) {
				return datas.some(function(data) {
					if ((data.url && data.url.replace(/^\/?#/, '') === path) || (data.extraUrl && _useExtraUrl(data.extraUrl,path))) {
						pathMenu = data;
						return true;
					}
					if (data.nodes) {
						return _scan(data.nodes)
					}
					return false;
				});
			}
			function _useExtraUrl(extraUrl,path){
				for (var i = 0; i < extraUrl.length; i++) {
					if (extraUrl[i].replace(/^\/?#/, '')===path) {
						return true;
					}
				}
				return false;
			}
			_scan(menus);
			if (pathMenu) {
				this._expandMenu(pathMenu);
			};

			this.path = path;
		}
	}

	_getRelation(menu, preMenu) {
		let menuId = menu.id;
		let preMenuId = preMenu.id;
		let relationState = 'prevIs';
		if (menuId.indexOf(preMenuId) === 0) {
			relationState += 'Parent';
		} else if (preMenuId.indexOf(menuId) === 0) {
			relationState += 'Child';
		} else {
			relationState += 'Brother';
		}

		return relationState;
	};

	_getState(menu) {
		let state = '';
		state += menu.url ? 'isUrl' : 'notUrl';
		state += menu.nodes ? 'hasNode' : 'noNode';
		state += this._getRelation(menu, preMenu);
		return state;
	};

	// 打开点击的menu
	_expandMenu(menu) {

		//this._collapsOtherMenu(menu);
		this._collapsAllMenuOnLink(menu);


		this.preExpandMenu = menu;
		this.preExpandMenus.push(menu);

		if (this.close) {
			this._expandLinkMenu();
			this.close = false;
		} else {
			let menus = this.menus;
			let expandMenuIds = menu.id.split('-');
			let expandMenu = menus[expandMenuIds.shift()];
			while (expandMenu) {
				expandMenu.menuCollapsed = false;
				expandMenu = (expandMenu && expandMenu.nodes) ? expandMenu.nodes[expandMenuIds.shift()] : null;
			}
		}

		if (menu.url) {
			tool.visibleMenu(menu);
		}
	};

	// 链接切换时进行关闭，并且只关闭链接
	_collapsLinkMenuOnLink(curMenu) {
		if (!curMenu.url) {
			return false;
		}
		let preExpandMenus = this.preExpandMenus;
		preExpandMenus.forEach(function(menu) {
			if (menu.url) {
				menu.menuCollapsed = true;
			}
		})
	};

	_expandLinkMenu() {
		let preExpandMenus = this.preExpandMenus;
		let menus = this.menus;
		preExpandMenus.forEach(function(menu) {
			tool.expandMenu(menu, menus);
		})
	};

	// 链接切换时进行关闭，关闭所有打开的menu
	_collapsAllMenuOnLink(curMenu) {
		if (!curMenu.url) {
			return false;
		}
		let preExpandMenus = this.preExpandMenus;
		let menus = this.menus;


		let menu = preExpandMenus.shift();
		while (menu) {
			tool.collapsMenu(menu, menus);
			menu = preExpandMenus.shift();
		}
	};

	// 只要和当前点击的菜单不是父子关系就关闭
	_collapsOtherMenu(menu) {
		let preMenu = this.preExpandMenu;
		tool.collapsMenu(preMenu, this.menus);
		return;
		if (!preMenu) {
			return;
		}

		let preMenuId = preMenu.id;
		let menuId = menu.id;

		if (preMenuId === menuId) {
			return;
		} else {
			if (preMenuId.length !== menuId.length) {

				let smaleId = menuId;
				let bigId = preMenuId;

				if (smaleId.length > bigId.length) {
					let tempId = smaleId;
					smaleId = bigId;
					bigId = tempId;
				}
				if (bigId.indexOf(smaleId) === 0) {
					return;
				}
			}
		}

		let menus = this.menus;
		let expandMenuIds = preMenu.id.split('-');
		let expandMenu = menus[expandMenuIds.shift()];
		while (expandMenu) {
			expandMenu.menuCollapsed = true;
			expandMenu = (expandMenu && expandMenu.nodes) ? expandMenu.nodes[expandMenuIds.shift()] : null;
		}
	};

	_closeAll() {
		let menus = this.menus;
		menus.forEach(function(menu) {
			menu.menuCollapsed = true;
		});
	};

	_openAll() {
		let menus = this.menus;
		menus.forEach(function(menu) {
			menu.menuCollapsed = false;
		});
	};

	// 菜单点击  打开状态是false 关闭 true
	nodeClick(node) {
		// 当前状态是闭合，关闭上个menu，打开当前menu
		if (node.menuCollapsed === true) { // 关闭状态
			this._expandMenu(node);
			// 当前状态是打开，直接关闭
		} else { // 打开状态
			// 当前状态是关闭，直接打开
			if (node.nodes) {
				node.menuCollapsed = false;
				// node.nodes[0]['menuCollapsed'] = false;
				tool.removeMenu(node, this.preExpandMenus);
			}
		}

		// 改变hash通知业务层
		if (node && node.url) {
			let newPath = node.url;

			// url为hash
			if(newPath.search(/^\/?#/)===0){
				newPath = newPath.replace(/^\/?#/, '');
				let currentPath = this.$location.path();
				if (currentPath === newPath) {
					//this.$window.location.reload();
				} else {
					this.$location.path(newPath)

					this.path = newPath;
				}

			// url为路径
			}else{
				window.location.href = newPath;
			}

		} else {
			//this.$scope.$broadcast('angular-ui-tree:expand-all');
			//this.menus[0].menuCollapsed = false;
			//scope.toggle();
			//this._expandMenu(node);
		}
	};

	closeMenu() {
		this.close = !this.close;
		if (this.close) {
			document.body.classList.add('menu-close');
			this._closeAll();
		} else {
			//this._expandMenu(this.preExpandMenu);
			document.body.classList.remove('menu-close')
			this._expandLinkMenu();
		}
	}
	buildClassName(node, collapsed) {
		let className = {};
		className['level' + node.level] = true;
		className[collapsed ? 'collapsed' : 'nocollapsed'] = true;
		className[collapsed ? 'collapsed' : 'nocollapsed'] = true;
		className["menu-has-nodes"] = !!node.nodes;
		return className;
	}

}

export default CommonmenuController;