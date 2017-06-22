class Controller {
    constructor($scope,$timeout) {
    	  'ngInject';
    	  this.scope = $scope;
      	this.timeout = $timeout;
      	this.name = 'calendar';
      	
      	this.calendartime='';
      	this.timeTitle='';

      	this.months =['一月','二月','三月','四月','五月','六月',
      				        '七月','八月','九月','十月','十一月','十二月'];
      	this.weekdays=[
        		{'day':'日'},
    	    	{'day':'一'},
    	    	{'day':'二'},
    	    	{'day':'三'},
    	    	{'day':'四'},
    	    	{'day':'五'},
    	    	{'day':'六'}];

  	    this.errorvalue=0;
  	    this.days=[];

    		var that=this;
    		this.addEvent(document,'click',function(){
      			if(that.isShowCalendar){
      				  that.isShowCalendar = false;
      				  that.scope.$apply();
      			}	
		    });
		    this.init();
  	}
  	init(){
  		  this.setInputValue();
  	}
  	/**
	   *初始input的显示时间
	   */
	  setInputValue(){
        if(this.gymodel && this.gymodel[1].length!=0){
      		  this.makeTimeFormat(this.gymodel[1][0],this.gymodel[1][1],this.gymodel[1][2]);
            this.setTimeSingleCalendar();
      	}
  	}

  	showTimeInput(item){    	
    	  if(item.classname=='after'){
    		    return;
    	  }
    		this.makeTimeFormat(item.year,item.month,item.day);
    		//this.calendartime=item.year+'-'+item.month+'-'+item.day;
    		this.gymodel[1]=[item.year,item.month,item.day];
        this.setTimeSingleCalendar();
    		if(this.gymethod!=undefined){
    			  this.gymethod();
    		}
  		  this.isShowCalendar=false;
  	}
    /*
     *显示日期标准格式2016-07-12
     */
  	makeTimeFormat(year,month,day){
    		this.calendartime=year+'-';
      	if(month<10){
      		  this.calendartime +='0'+month+'-';
      	}else{
      		  this.calendartime +=month+'-';
      	}
      	if(day<10){
      		  this.calendartime+='0'+day;
      	}else{
      		  this.calendartime+=day;
      	}
  	}
    //如果是单个日历，this.gymodel[2]保存日期标准格式['2016','07','12']
    setTimeSingleCalendar(){
        if (this.gymodel[0]==0) {
            this.gymodel[2]=this.makeTimeFormatInArray(this.gymodel[1][0],this.gymodel[1][1],this.gymodel[1][2]);
        }
    }
    makeTimeFormatInArray(year,month,day){
        let time =[];
        time[0]=year.toString();
        if(month<10){
            time[1]='0'+month;
        }else{
            time[1]=month.toString();
        }
        if(day<10){
            time[2]='0'+day;
        }else{
            time[2]=day.toString();
        }
        return time;
    }

  	left($event){
  		  this.errorvalue--;
	      this.getDays();
	      $event.stopPropagation();
  	}
  	right($event){
  		  this.errorvalue++;
	      this.getDays();
	      $event.stopPropagation();
  	}
  	getPos(obj){
    		var l=0;
    		var t=0;
    		while(obj){
      			l+=obj.offsetLeft;
      			t+=obj.offsetTop;
      			obj=obj.offsetParent;
    		}
    		return {left:l, top:t};
	  }
  	addEvent(obj,sEv,fn){
    		if(obj.addEventListener){
    			  obj.addEventListener(sEv,fn,false);
    		}else{
    			  obj.attachEvent('on'+sEv,fn);
    		}
  	}
  	showcalendar($event){
    		if(this.isShowCalendar){
    			  return;
    		}
    		this.isShowCalendar = true;
    		//$event.stopPropagation();

    		this.timeout(()=> {
    			  this.isShowCalendar = true;
    			  $event.stopPropagation();
    		}, 100);
    		this.getDays();
  		  //oBox.style.left=this.getPos(oT).left+'px';
  		  //oBox.style.top=this.getPos(oT).top+oT.offsetHeight+'px';
    }
  	/**
	   *得到每月的天数
	   */
  	getDays(){
    		this.days=[];
        console.log(this.gymodel);
    		this.getPreLi();     
    		this.getExistLi();   
    		this.getAfterLi();   
  	}

  	/*
  	 *日历前面部分填充
  	 */
  	getPreLi(){
  		  let date=new Date();
    		date.setMonth(date.getMonth()+this.errorvalue,1);
    		date.setDate(1);	
    		let preDayCount=date.getDay();
    		date.setDate(0);
    		let year = date.getFullYear();
    		let month = date.getMonth()+1;
    		let dayCount=date.getDate();

    		if(this.gymodel[0]==0){
    			  this.setPreCalendarShowSingle(preDayCount,year,month,dayCount);
    		}
    		else if(this.gymodel[0]==1){
      			if(this.gymodel[2].length==0){
      				  this.setPreCalendarShowSingle(preDayCount,year,month,dayCount);
      			}
      			else{
      				  this.setPreCalendarShowCoupleFirst(preDayCount,year,month,dayCount);
      			}
    		}
    		else if(this.gymodel[0]==2){
      			if(this.gymodel[2].length==0){
      				  this.setPreCalendarShowSingle(preDayCount,year,month,dayCount);
      			}
      			else{
      				  this.setPreCalendarShowCoupleSecond(preDayCount,year,month,dayCount);
      			}
    		}
  	}
  	setPreCalendarShowSingle(preDayCount,year,month,dayCount){
    		let [currYear,currMonth,currDay] = this.getCurrDate();
    		for(let i=dayCount-preDayCount+1; i<=dayCount; i++){
      			if(this.IsTimePasted(year,month,i,currYear,currMonth,currDay)){
      				  this.days.push({year:year,month:month,day:i,classname:'past'});
      			}else{
    				    this.days.push({year:year,month:month,day:i,classname:'after'});
    			  }
  		  }
  	}
  	
  	setPreCalendarShowCoupleFirst(preDayCount,year,month,dayCount){
    		for(let i=dayCount-preDayCount+1; i<=dayCount; i++){
      			if(this.IsTimePasted(year,month,i,this.gymodel[2][0],this.gymodel[2][1],this.gymodel[2][2])){
      				  this.days.push({year:year,month:month,day:i,classname:'past'});
      			}else{
    				    this.days.push({year:year,month:month,day:i,classname:'after'});
    			  }
  		  }
  	}
  	setPreCalendarShowCoupleSecond(preDayCount,year,month,dayCount){
    		let [currYear,currMonth,currDay] = this.getCurrDate();
    		for(let i=dayCount-preDayCount+1; i<=dayCount; i++){
    			  if(this.IsTimePasted(year,month,i,currYear,currMonth,currDay)
    				    &&this.IsTimePasted(this.gymodel[2][0],this.gymodel[2][1],this.gymodel[2][2],year,month,i)){
    				    this.days.push({year:year,month:month,day:i,classname:'past'});
    			  }else{
  				      this.days.push({year:year,month:month,day:i,classname:'after'});
  			    }
  		  }
  	} 

  	/*
  	 *日历中间部分,正好一个月
  	 */
  	getExistLi(){
  		  //日历标题显示的日期，格式'七月 2016'
  		  let date=new Date();
    		date.setMonth(date.getMonth()+this.errorvalue,1);
    		date.setMonth(date.getMonth()+1);
    		date.setDate(0);
    		let showYear = date.getFullYear();
    		let showMonth=date.getMonth()+1;
    		let showDayCount=date.getDate();
		
		    this.timeTitle = this.months[showMonth-1]+'  '+showYear; 
    		if(this.gymodel[0]==0){
    			  this.setCalendarShowSingle(showYear,showMonth,showDayCount);
    		}
    		else if(this.gymodel[0]==1){
    			if(this.gymodel[2].length==0){
    				  this.setCalendarShowSingle(showYear,showMonth,showDayCount);
    			}else{
    				  this.setCalendarShowCoupleFirst(showYear,showMonth,showDayCount);
    			}
    		}
    		else if(this.gymodel[0]==2){
      			if(this.gymodel[2].length==0){
      				  this.setCalendarShowSingle(showYear,showMonth,showDayCount);
      			}else{
      				  this.setCalendarShowCoupleSecond(showYear,showMonth,showDayCount);
      			}
    		}
  	}
  	/**
  	 *使用单个日历时用来显示日历信息
  	 */
  	setCalendarShowSingle(showYear,showMonth,showDayCount){
    		let [currYear,currMonth,currDay] = this.getCurrDate();
    		for(let i=1;i<=showDayCount;i++){
      			if(this.IsTimePasted(showYear,showMonth,i,currYear,currMonth,currDay)){
        				if(showYear==currYear && showMonth==currMonth && i==currDay){
        					  this.days.push({year:showYear,month:showMonth,day:i,classname:'today'});
        				}else{
        					  this.days.push({year:showYear,month:showMonth,day:i,classname:'past'});
        				}
      			}else{
    				    this.days.push({year:showYear,month:showMonth,day:i,classname:'after'});
    			  }
    		}
  	}
  	/**
  	 *使用联动日历时用来显示前一个日历信息
  	 */
  	setCalendarShowCoupleFirst(showYear,showMonth,showDayCount){
    		let [currYear,currMonth,currDay] = this.getCurrDate();
    		for(let i=1;i<=showDayCount;i++){
      			if(this.IsTimePasted(showYear,showMonth,i,this.gymodel[2][0],this.gymodel[2][1],this.gymodel[2][2])){
        				if(showYear==currYear && showMonth==currMonth && i==currDay){
        					  this.days.push({year:showYear,month:showMonth,day:i,classname:'today'});
        				}else{
        					  this.days.push({year:showYear,month:showMonth,day:i,classname:'past'});
        				}
      			}else{
    				    this.days.push({year:showYear,month:showMonth,day:i,classname:'after'});
    			  }
    		}
  	}

  	/**
  	 *使用联动日历时用来显示后一个日历信息
  	 */
  	setCalendarShowCoupleSecond(showYear,showMonth,showDayCount){
    		let [currYear,currMonth,currDay] = this.getCurrDate();
    		for(let i=1; i<=showDayCount; i++){
      			if(this.IsTimePasted(showYear,showMonth,i,currYear,currMonth,currDay)
      				  &&this.IsTimePasted(this.gymodel[2][0],this.gymodel[2][1],this.gymodel[2][2],showYear,showMonth,i)){
        				if(showYear==currYear && showMonth==currMonth && i==currDay){
        					  this.days.push({year:showYear,month:showMonth,day:i,classname:'today'});
        				}else{
        					  this.days.push({year:showYear,month:showMonth,day:i,classname:'past'});
        				}
      			}else{
    				    this.days.push({year:showYear,month:showMonth,day:i,classname:'after'});
    			  }
  		  }
  	}
  	/*
  	 *日历后面部分填充
  	 */
  	getAfterLi(){
    		let extraDay = this.days.length%7;
    		if(extraDay==0) return;
    		let aftDayCount=7-extraDay;
    		let date=new Date();
    		date.setMonth(date.getMonth()+this.errorvalue+1);
    		let year = date.getFullYear();
    		let month = date.getMonth()+1;
    		if(this.gymodel[0]==0){
    			  this.setAftCalendarShowSingle(aftDayCount,year,month);
    		}
    		else if(this.gymodel[0]==1){
      			if(this.gymodel[2].length==0){
      				  this.setAftCalendarShowSingle(aftDayCount,year,month);
      			}else{
      				  this.setAftCalendarShowCoupleFirst(aftDayCount,year,month);
      			}
    		}
    		else if(this.gymodel[0]==2){
      			if(this.gymodel[2].length==0){
      				  this.setAftCalendarShowSingle(aftDayCount,year,month);
      			}else{
      				  this.setAftCalendarShowCoupleSecond(aftDayCount,year,month);
      			}
    		}
  	}
  	setAftCalendarShowSingle(aftDayCount,year,month){
    		let [currYear,currMonth,currDay] = this.getCurrDate();
    		for(let i=1;i<=aftDayCount;i++){
      			if(this.IsTimePasted(year,month,i,currYear,currMonth,currDay)){
      				  this.days.push({year:year,month:month,day:i,classname:'past'});
      			}else{
    				    this.days.push({year:year,month:month,day:i,classname:'after'});
    			  }
    		}
  	}
  	setAftCalendarShowCoupleFirst(aftDayCount,year,month){
    		for(let i=1;i<=aftDayCount;i++){
      			if(this.IsTimePasted(year,month,i,this.gymodel[2][0],this.gymodel[2][1],this.gymodel[2][2])){
      				  this.days.push({year:year,month:month,day:i,classname:'past'});
      			}else{
    				    this.days.push({year:year,month:month,day:i,classname:'after'});
    			  }
    		}
  	}
  	setAftCalendarShowCoupleSecond(aftDayCount,year,month){
    		let [currYear,currMonth,currDay] = this.getCurrDate();
    		for(let i=1; i<=aftDayCount; i++){
      			if(this.IsTimePasted(year,month,i,currYear,currMonth,currDay)
      				  &&this.IsTimePasted(this.gymodel[2][0],this.gymodel[2][1],this.gymodel[2][2],year,month,i)){
      				  this.days.push({year:year,month:month,day:i,classname:'past'});
      			}else{
    				    this.days.push({year:year,month:month,day:i,classname:'after'});
    			  }
  		  }
  	}
  	getCurrDate(){
    		let date=new Date();
    		date.setMonth(date.getMonth()+1);
    		let dateInfo = [date.getFullYear(),date.getMonth(),date.getDate()];
    		return dateInfo;
  	}
  	IsTimePasted(year,month,i,currYear,currMonth,currDay){
    		if(year<currYear){
    			  return true;
    		}
    		if(year==currYear && month<currMonth){
    			  return true;
    		}
    		if(year==currYear && month==currMonth && i<=currDay){
    			  return true;
    		}
    		return false;
  	}
}

export default Controller;
