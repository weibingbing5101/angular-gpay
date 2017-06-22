var tools = {
	cap: function (val){
	  return val.charAt(0).toUpperCase() + val.slice(1);
	},
	arrayUnique: function (arr){
	  var arrMap = {};
	  return arr.filter(function(item){
	    if(!arrMap[item.appname]){
	      arrMap[item.appname] = true;
	      return true
	    }
	    return false;
	  })
	}
}



export default tools;