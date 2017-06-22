let menus = [{
	"id": 0,
	"title": "组合商品",
	"nodes": [{
		"id": "00",
		"title": "组合商品列表",
		"url": "/groupgoods/group_goods/index"
	}, {
		"id": "01",
		"title": "商品发布",
		"url": "/groupgoods/group_goods/inputBoot"
	}]
}, {
	"id": 1,
	"title": "玩家",
	"nodes": [{
		"id": "10",
		"title": "大玩家门店对应关系",
		"url": "/player/store/getlist"
	}, {
		"id": "11",
		"title": "游戏机列表",
		"url": "/player/gamemachine/getlist"
	}]
}, {
	"id": 2,
	"title": "旅游管理",
	"nodes": [{
		"id": "20",
		"title": "线路管理",
		"url": "/travel/route/index"
	}, {
		"id": "21",
		"title": "顾问管理",
		"url": "/travel/counsellor/index"
	}]
}, {
	"id": 3,
	"title": "风险控制",
	"nodes": [{
		"id": "30",
		"title": "规则预警管理",
		"nodes": [{
			"id": "30",
			"title": "监控规则预警",
			"url": "/riskmanagement/rule_warning/index"
		}, {
			"id": "31",
			"title": "预警处理记录",
			"url": "/riskmanagement/rule_warning/operations"
		}]
	}]
}]

export default menus;