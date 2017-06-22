class Controller {
  	constructor($scope,$location,$cookies,appBasicSvc) {
  		'ngInject';
    	this.name = 'app/desc';
        this.$location=$location;
        this.appId = this.$location.search().appId;
        this.currency=$cookies.get('currency');
        
    	this.appBasicSvc = appBasicSvc;
    	this.appBasicInfo = {
    		totalUsr:'',
    		totalAmt:'',
    		totalOrdr:'',
    		totalSucOrdr:'',
    		ordrCvt:''
    	};
        this.isToday = true;
        this.isYesterday = false;
        
        let echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例
        this.tradeTrendChart = echarts.init(document.getElementsByClassName('chart-tradeTrend-content')[0]);
        this.tradeDataToday = {
            xdata:['0时','2时','4时','6时','8时','10时','12时','14时','16时','18时','20时','22时','24时'],
            //moneyCount:[10, 20, 5, 20, 36, 10, 10, 20,5, 20, 36, 10],
            //dealCount: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10,10]
            moneyCount:[],
            dealCount:[]
        };
        this.tradeDataYes = {
            xdata:['0时','2时','4时','6时','8时','10时','12时','14时','16时','18时','20时','22时','24时'],
            moneyCount:[15, 25,5, 40, 36, 10, 10, 20,5, 20, 36, 10],
            dealCount:  [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 10]
        };
        this.sevenTradeChart = echarts.init(document.getElementsByClassName('chart-seven-content')[0]);
        this.sevenTradeData = {
            xdata:['1d','2d','3d','4d','5d','6d','7d'],
            moneyCount: [15, 25, 5, 40, 36, 10, 40],
            dealCount:  [0, 20, 36, 10, 10, 20, 5]
        };
        this.monthTradeChart = echarts.init(document.getElementsByClassName('chart-month-content')[0]);
        this.monthTradeData = {
            xdata:['1d','2d','3d','4d','5d','6d','7d','8d','9d','10d','11d','12d','13d','14d','15d','16d','17d','18d','19d','20d','21d','22d','23d','24d','25d','26d','27d','28d','29d','30d'],
            moneyCount: [15, 25, 5, 40, 36, 10, 10, 20, 5, 20, 36, 10, 15, 25, 5, 40, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10],
            dealCount: [40, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 10, 15, 25, 5, 40, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10]
        };

        this.init();
 	}
 	init(){
 		this.getAppBasicInfo();
        //this.getTradeChart(1);  //1表示昨天，
        this.getTradeChart(0);  //0表示今天,获得今天交易数据
        this.getTradeChart(2);  //2表示最近7天，
        this.getTradeChart(3);  //3表示最近30天
        //this.changeChartData('today');
        //this.changeChartData('seven');
        //this.changeChartData('month');
       
        
 	}
 	getAppBasicInfo(){
 		let params={appId:this.appId};
 		this.appBasicSvc
 			.queryAppBasicInfo(params)
 			.then((data)=>{
                // console.log(data);
                this.appBasicInfo.totalUsr = data.totalUsr;
                this.appBasicInfo.totalAmt = data.totalAmt;
                this.appBasicInfo.totalOrdr = data.totalOrdr;
                this.appBasicInfo.totalSucOrdr = data.totalSucOrdr;
                this.appBasicInfo.ordrCvt = data.ordrCvt;
      	  	},()=>{
		        
	      	});
 	}
    changeChartData(value){
        if(value=='today'){
            let xdata = this.tradeDataToday.xdata;
            let moneyCount =this.tradeDataToday.moneyCount;
            let dealCount = this.tradeDataToday.dealCount;
            let minOrderNum = this.tradeDataToday.minOrderNum;
            let minTradeVolume = this.tradeDataToday.minTradeVolume;
            let orderScale = this.tradeDataToday.orderScale;
            let volumeScale = this.tradeDataToday.volumeScale;
            this.setChartOption('hour', this.tradeTrendChart,xdata,moneyCount,dealCount,minOrderNum,minTradeVolume,orderScale,volumeScale,14);
        }else if(value=="yesterday"){
            let xdata = this.tradeDataYes.xdata;
            let moneyCount = this.tradeDataYes.moneyCount;
            let dealCount = this.tradeDataYes.dealCount;
            let minOrderNum = this.tradeDataYes.minOrderNum;
            let minTradeVolume = this.tradeDataYes.minTradeVolume;
            let orderScale = this.tradeDataYes.orderScale;
            let volumeScale = this.tradeDataYes.volumeScale;
            this.setChartOption('hour', this.tradeTrendChart,xdata,moneyCount,dealCount,minOrderNum,minTradeVolume,orderScale,volumeScale,14);
        }else if (value=="seven") {
            let xdata =this.sevenTradeData.xdata;
            let moneyCount = this.sevenTradeData.moneyCount;
            let dealCount = this.sevenTradeData.dealCount;
            let minOrderNum = this.sevenTradeData.minOrderNum;
            let minTradeVolume = this.sevenTradeData.minTradeVolume;
            let orderScale = this.sevenTradeData.orderScale;
            let volumeScale = this.sevenTradeData.volumeScale;
            this.setChartOption('week', this.sevenTradeChart,xdata,moneyCount,dealCount,minOrderNum,minTradeVolume,orderScale,volumeScale,34);
        }else if (value=="month") {
            let xdata = this.monthTradeData.xdata;
            let moneyCount = this.monthTradeData.moneyCount;
            let dealCount =  this.monthTradeData.dealCount;
            let minOrderNum = this.monthTradeData.minOrderNum;
            let minTradeVolume = this.monthTradeData.minTradeVolume;
            let orderScale = this.monthTradeData.orderScale;
            let volumeScale = this.monthTradeData.volumeScale;
            this.setChartOption('month', this.monthTradeChart,xdata,moneyCount,dealCount,minOrderNum,minTradeVolume,orderScale,volumeScale,14,45);
        }
    }
    setChartOption(period, chart,xdata,moneyCount,dealCount,minOrderNum,minTradeVolume,orderScale,volumeScale,perBarWidth,xRotate=0){
        // 绘制图表
        // 
        let orderMax = minOrderNum+orderScale*5;
        let tradeVolumeMax = minTradeVolume+volumeScale*5;

        let tooltipParams = {
            trigger: 'axis'
        }

        if(period==='hour'){
            tooltipParams.formatter = function(params, a){
                let len = xdata.length-1;
                let index = params[1].dataIndex;
                let showData = index<len ? xdata[index] + '-' + xdata[index+1] : xdata[len];
                params.forEach(function(param){
                    showData += '<br /><span class="chart-circle" style="background:'+param.color+';"></span>' + param.seriesName + '：' + param.data;
                });


                return showData;
            }
        }

        chart.setOption({
            //title: { text: '交易趋势' },
            tooltip: tooltipParams,
            grid:{
                borderColor:'#ccc'
            },
            legend: {
                data:['成功交易额','成功订单数']
            },
            xAxis: {
                axisLine:{
                    lineStyle:{
                        color:'#ccc',
                    }
                },
                axisLabel:{
                    margin:30,
                    textStyle:{
                        color:'#000000'
                    },
                    interval:0,
                    rotate:xRotate
                },
                data:xdata
            },
            yAxis: [
                {
                    type: 'value',
                    name: this.currency=="USD"?'单位：美元':'单位：元',
                    max: tradeVolumeMax,
                    // min: minTradeVolume,
                    interval:tradeVolumeMax/5,
                    nameTextStyle:{
                        color:'#000000'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ccc',
                        }
                    },
                    axisLabel:{
                        margin:40,
                        textStyle:{
                            color:'#000000'
                        }
                    }
                },
                {
                    type: 'value',
                    name: '单位：笔',
                    max: orderMax,
                    // min: minOrderNum,
                    interval:orderMax/5,
                    nameTextStyle:{
                        color:'#000000'
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#ccc',
                        }
                    },
                    axisLabel:{
                        margin:20,
                        textStyle:{
                            color:'#000000'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '成功交易额',
                    type: 'bar',
                    barWidth:perBarWidth,
                    itemStyle:{
                        normal:{
                            color:'#00c4d5'
                        },
                    },
                    data: moneyCount
                },{
                    name: '成功订单数',
                    type: 'line',
                    borderWidth:0,
                    itemStyle:{
                        normal:{
                            color:'#ff6000',
                            width:1,
                        },
                    },
                    yAxisIndex: 1,
                    data:dealCount
                }
            ]
        });
    }
    goSDK(){
        window.open('https://github.com/goopalpay/goopal-payment-sdk');   
    }
    goDoc(){
        window.open('#/doc/detail/index');
    }

    getTradeChart(value){
        let params = {
            appId:this.appId,
            type:value
        };
        this.appBasicSvc.getTradeChart(params)
        .then(data=>{
            if (value==0) {
                for(let key in data.object){
                    this.tradeDataToday.moneyCount[key] = data.object[key].tradeVolume;
                    this.tradeDataToday.dealCount[key] = data.object[key].orderNum;
                    
                }
                this.tradeDataToday.minOrderNum = data.minOrderNum.replace(',','');
                this.tradeDataToday.minTradeVolume = data.minTradeVolume.replace(',','');
                this.tradeDataToday.orderScale = data.orderScale.replace(',','');
                this.tradeDataToday.volumeScale = data.volumeScale.replace(',','');
                this.changeChartData('today');
            }else if (value==1) {
                for(let key in data.object){
                    this.tradeDataYes.moneyCount[key] = data.object[key].tradeVolume;
                    this.tradeDataYes.dealCount[key] = data.object[key].orderNum;
                    
                }
                this.tradeDataYes.minOrderNum = data.minOrderNum.replace(',','');
                this.tradeDataYes.minTradeVolume = data.minTradeVolume.replace(',','');
                this.tradeDataYes.orderScale = data.orderScale.replace(',','');
                this.tradeDataYes.volumeScale = data.volumeScale.replace(',','');
                this.changeChartData('yesterday');
            }else if (value==2) {
                for(let key in data.object){
                    this.sevenTradeData.xdata[key] = data.object[key].startTime.substring(0,10);
                    this.sevenTradeData.moneyCount[key] = data.object[key].tradeVolume;
                    this.sevenTradeData.dealCount[key] = data.object[key].orderNum;
                }
                this.sevenTradeData.minOrderNum = data.minOrderNum.replace(',','');
                this.sevenTradeData.minTradeVolume = data.minTradeVolume.replace(',','');
                this.sevenTradeData.orderScale = data.orderScale.replace(',','');
                this.sevenTradeData.volumeScale = data.volumeScale.replace(',','');
                this.changeChartData('seven');
            }else if (value==3) {
                for(let key in data.object){
                    this.monthTradeData.moneyCount[key] = data.object[key].tradeVolume;
                    this.monthTradeData.dealCount[key] = data.object[key].orderNum;
                    this.monthTradeData.xdata[key] = data.object[key].startTime.substring(5,10);
                    
                }
                this.monthTradeData.minOrderNum = data.minOrderNum.replace(',','');
                this.monthTradeData.minTradeVolume = data.minTradeVolume.replace(',','');
                this.monthTradeData.orderScale = data.orderScale.replace(',','');
                this.monthTradeData.volumeScale = data.volumeScale.replace(',','');
                this.changeChartData('month');
            }
                
        },err=>{

        });
    }
}

export default Controller

