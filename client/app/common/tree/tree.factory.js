/**
 * @file menu tool
 */

// 对菜单操作的一些工具方法
let tool = {
	/**
	 * @desc 完全打开一个菜单，即如果当前菜单不是一级菜单，它的各级父菜单也会打开
	 * @param menu { Object } 要打开的菜单
	 * @param menus { Array } 所有的菜单，需要根据这个参数去找父菜单
	 * @return null { Null }
	 */
	expandMenu: function(menu, menus) {
		if (!menu || !menu.id || !menus.length) {
			return;
		}
		let menuIds = menu.id.split('-');
		let expandMenu = menus[menuIds.shift()];
		while (expandMenu) {
			if (expandMenu.nodes) {
				expandMenu.menuCollapsed = false;
			}
			expandMenu = (expandMenu && expandMenu.nodes) ? expandMenu.nodes[menuIds.shift()] : null;
		}
	},
	/**
	 * @desc 完全关闭一个菜单，即如果当前菜单不是一级菜单，它的各级父菜单也会关闭
	 * @param menu { Object } 要关闭的菜单
	 * @param menus { Array } 所有的菜单，需要根据这个参数去找父菜单
	 * @return null { Null }
	 */
	collapsMenu: function(menu, menus) {
		if (!menu || !menu.id || !menus.length) {
			return;
		}
		let menuIds = menu.id.split('-');
		let expandMenu = menus[menuIds.shift()];
		while (expandMenu) {
			expandMenu.menuCollapsed = true;
			expandMenu = (expandMenu && expandMenu.nodes) ? expandMenu.nodes[menuIds.shift()] : null;
		}
	},
	/**
	 * @desc 从给定的菜单列表里删除一个菜单
	 * @param menu { Object } 要删除的菜单
	 * @param menus { Array } 所有的菜单，需要在这个参数找删除哪个菜单
	 * @return null { Null }
	 */
	removeMenu: function(menu, menus) {
		menus.some(function(m, index) {
			if (menu.id && m.id.indexOf(menu.id) === 0) {
				menus.splice(index, 1);
				return true;
			}
			return;
		})
	},
	/**
	 * @desc 如果当前menu没在可视区域，将当前menu放到可视区域；
	 * 这里应该放在directive里做，现在暂时放到controller
	 * @param menu { Object } 要关闭的菜单
	 * @return null { Null }
	 */
	visibleMenu: function(menu) {
		if (!menu || !menu.id) {
			return;
		}
		// 计算把当前menu放到可是区域需要打高度
		let menuIds = menu.id.split('-');
		let len = menuIds.length - 1;
		let totalHeight = 0;
		menuIds.forEach(function(menuId, index) {
			let num = ~~menuId;
			num = index === len ? num : num + 1;
			totalHeight += num * (index === 0 ? 50 : 42);
		});
		setTimeout(function() {
			$('#tree-root').scrollTop(totalHeight);
		})
	},
	/**
	 * @desc 处理菜单数据，增加一些参数，增加的参数：id、level、menuCollapsed
	 * @param menu { Object } 要关闭的菜单
	 * @return null { Null }
	 */
	filterMenus: function(arr, level = 0, parentIndex) {
		arr.forEach(function(item, index) {
			item.id = (parentIndex ? parentIndex + '-' : '') + index;
			item.level = level;
			item.menuCollapsed = true;
			if (item.nodes) {
				tool.filterMenus(item.nodes, level + 1, item.id);
			}
		})
	},
	/**
	 * @desc 根据path在菜单里匹配是否有包含此path的菜单
	 * @param path { String } 要匹配的path
	 * @param menus { Array } 用来查找的menus
	 * @return pathMenu { Object }
	 */
	matchPathMenu: function(path, menus) {

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

			return pathMenu;
		}
	},
	/**
	 * @desc 获取两个菜单的关系
	 * @param menu { Obejct }
	 * @param preMenu { Obejct }
	 * @return pathMenu { String }
	 */
	getRelation(menu, preMenu) {
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
	}
};

export default function() {
	return tool;
};