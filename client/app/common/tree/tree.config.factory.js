import _ from 'lodash';

let TreeConfigFactory = function() {

	const TREE_CONFIG = {};

	// ================================================================================
	// 我的相关
	let mineLeftMnueConfig = [{
		'id': 0,
		'title': '账户总览',
		'url': '#/mine/total',
		'iconClass': 'icon mine',
		'iconCurClass': 'icon minecur',		
	}, {
		'id': 1,
		'title': '基本信息',
		'url': '#/mine/infor',
		'iconClass': 'icon mineinfo',
		'iconCurClass': 'icon mineinfocur',				
	},{
		'id':2,
		'title':'密钥管理',
		//'url':'#/mine/secretKey/home',
		//'showUrl': '/mine/secretKey/transcationKey',
		'iconClass': 'icon tree-key',
		'iconCurClass': 'icon tree-key-selected',
		'nodes':[
		    {'id':'21',
		     'title':'交易密钥',
		     'url':'#/mine/secretKey/transcationKey'},
		    {'id':'22',
		     'title':'通知密钥',
		     'url':'#/mine/secretKey/notifyKey'}
		]},{
		'id': 3,
		'title': '修改密码',
		'url': '#/mine/editpwd',
		'iconClass': 'icon editpwd',
		'iconCurClass': 'icon editpwdcur',				
	}];

	TREE_CONFIG['/mine/total'] = mineLeftMnueConfig;

	TREE_CONFIG['/mine/infor'] = mineLeftMnueConfig;

	TREE_CONFIG['/mine/editpwd'] = mineLeftMnueConfig;
	//TREE_CONFIG['/mine/secretKey/home'] = mineLeftMnueConfig;
	TREE_CONFIG['/mine/secretKey/transcationKey'] = mineLeftMnueConfig;
    TREE_CONFIG['/mine/secretKey/notifyKey'] = mineLeftMnueConfig;
	// 订单查询  相关
	var orderLeftMenuConfig = [{
		'id': 0,
		'title': '应用概况',
		'url': '#/app/desc',
		'iconClass': 'icon appdes',
		'iconCurClass': 'icon appdescur',
	}, {
		'id': 1,
		'title': '交易管理',
		'url':'#/order/home',
		'showUrl': '/order/list',
		'iconClass': 'icon order',
		'iconCurClass': 'icon ordercur',
		'nodes': [{
			'id': '10',
			'title': '商户订单',
			'url': '#/order/list'
		}, {
			'id': '11',
			'title': '退款记录',
			'url': '#/order/refund'
		}, {
			'id': '12',
			'title': '结算记录',
			'url': '#/order/settlement'
		}]
	}, {
		'id': 2,
		'title': '应用信息',
		'url': '#/app/infor',
		'iconClass': 'icon appinfo',
		'iconCurClass': 'icon appinfocur',
	}, {
		'id': 3,
		'title': '报表下载',
		'url': '#/sheet/download',
		'iconClass': 'icon sheetdown',
		'iconCurClass': 'icon sheetdowncur',		
	}];

	TREE_CONFIG['/order/list'] = orderLeftMenuConfig;
	TREE_CONFIG['/order/home'] = orderLeftMenuConfig;
	TREE_CONFIG['/order/refund'] = orderLeftMenuConfig;
	TREE_CONFIG['/order/settlement'] = orderLeftMenuConfig;
	TREE_CONFIG['/app/infor'] = orderLeftMenuConfig;
	TREE_CONFIG['/app/desc'] = orderLeftMenuConfig;

	// 报表下载
	TREE_CONFIG['/sheet/download'] = orderLeftMenuConfig;
	/*
	[{
		'id': 0,
		'title': '报表下载',
		'url': '#/sheet/download'
	}, {
		'id': 1,
		'title': '下载记录',
		'disabled': true
			//'url': '#/sheet/download'
	}]
	*/

	let docMenu = [{
		'id': 0,
		'title': '接入引导',
		'url': '#/doc/guide',
		'iconClass': 'icon guide',
		'iconCurClass': 'icon guidecur',		
	}, {
		'id': 1,
		'title': '支付产品',
		'url': '#/doc/detail/index',
		'showUrl': '/doc/detail/mapy',
		'iconClass': 'icon doc',
		'iconCurClass': 'icon doccur',		
		'nodes': [{
			'id': '10',
			'title': '移动APP支付',
			'url': '#/doc/detail/mpay'
		},{
			'id':'11',
			'title':'手机网站支付',
			'url':'#/doc/detail/net'
		}]
	}]

	let helpMenu = [{
		'id': 0,
		'title': '账户问题',
		'url': '#/help/account'
	},{
		'id': 1,
		'title': '交易退款',
		'url': '#/help/refund'
	},{
		'id': 2,
		'title': '产品费率',
		'url': '#/help/fee'
	}]

	function item2map(items, map, allItems) {
		map = map || {};
		items.forEach(function(item) {
			if (item.url) {
				map[item.url.replace(/^\/?#/, '')] = allItems||items;
			}
			if (item.nodes) {
				item2map(item.nodes, map, allItems||items);
			}
		})
		return map;
	}

	item2map(docMenu, TREE_CONFIG);
	item2map(helpMenu, TREE_CONFIG);

	

	return {
		getData: function() {
			return TREE_CONFIG;
		}
	}
};

export default TreeConfigFactory;