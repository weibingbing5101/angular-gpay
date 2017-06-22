import lodash from 'lodash';
let data = {};

let method = {
	set: function(newData){
		lodash.extend(data, newData);
	},
	get: function(){
		return data;
	}
}

export default method;