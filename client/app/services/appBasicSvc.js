/**
 * author gengmangmang
 * 应用相关接口
 */
export default class appBasicSvc {
  	constructor(Api) {
    	'ngInject';
    	this.Api = Api;
  	}
  
  	// 应用概况查询
  	queryAppBasicInfo(params) {
    	return this.Api.post('queryAppSumInfo', params);
  	}  
	//数据图表查询数据
  	getTradeChart(params){
      /*
  		if (process && process.env && process.env.NODE_ENV=='dev') {
  			let data = {
  				code:0,
  				msg:'null',
  				object:[
  					{	
  						"tradeVolume":"42.22", 
  						"orderNum":"100", 
  						"startTime":"2016-10-14 12:00:00", 
  						"endTime":"2016-10-14 14:00:00"
  					},{
  						"tradeVolume":"42.22", 
  						"orderNum":"200", 
  						"startTime":"2016-10-14 14:00:00", 
  						"endTime":"2016-10-14 16:00:00"
  					},{
              "tradeVolume":"42.22", 
              "orderNum":"200", 
              "startTime":"2016-10-14 14:00:00", 
              "endTime":"2016-10-14 16:00:00"
            },{
              "tradeVolume":"42.22", 
              "orderNum":"200", 
              "startTime":"2016-10-14 14:00:00", 
              "endTime":"2016-10-14 16:00:00"
            },{
              "tradeVolume":"42.22", 
              "orderNum":"200", 
              "startTime":"2016-10-14 14:00:00", 
              "endTime":"2016-10-14 16:00:00"
            },{
              "tradeVolume":"42.22", 
              "orderNum":"200", 
              "startTime":"2016-10-14 14:00:00", 
              "endTime":"2016-10-14 16:00:00"
            },{
              "tradeVolume":"42.22", 
              "orderNum":"200", 
              "startTime":"2016-10-14 14:00:00", 
              "endTime":"2016-10-14 16:00:00"
            }
  				]
  			};
  			return this.Api.testData(data);
  		}
      */
  		return this.Api.post('getTradeChart',params);
  	}

}