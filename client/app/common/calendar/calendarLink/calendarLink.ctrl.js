class Controller {
  	constructor($scope) {
  		'ngInject';
	    this.name = 'calendarLink';
	    this.scope = $scope;

	    this.setCalendarValue();

	   	let that =this;
	   	this.method = function() {
	  		that.timepre[2] = that.timeaft[1];
	  		that.timeaft[2] = that.timepre[1];
	  		that.setTimeCoupleCalendar();
	   	};
  	}
  	setCalendarValue(){
      if (this.gygetstartdate && this.gygetenddate) {
        this.timepre=[1,this.gygetstartdate,this.gygetenddate];
        this.timeaft=[2,this.gygetenddate,this.gygetstartdate];
        this.setTimeCoupleCalendar();
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
  	setTimeCoupleCalendar(){
  		if(this.timepre[1].length!=0){
	  		this.gyreturnstartdate = this.makeTimeFormatInArray(this.timepre[1][0],this.timepre[1][1],this.timepre[1][2]);
	  	}
	  	if(this.timeaft[1].length!=0){
	  		this.gyreturnenddate = this.makeTimeFormatInArray(this.timeaft[1][0],this.timeaft[1][1],this.timeaft[1][2]);
	  	}
  	}

}

export default Controller;
