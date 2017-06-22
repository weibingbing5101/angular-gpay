import header from './header';
import footer from './footer';
import breadNav from './breadNav/breadNav';
import inputUpload from './input/upload/index';
import errorMsg from './input/error/index';
import calendar from './calendar/calendar';
import calendarLink from './calendar/calendarLink/calendarLink';
import select from './input/select/select';
import tree from './tree/tree';
import popWindow from './window/pop/popwindow';
import popSpecial from './window/popSpecial/popSpecial';
import tips from './tips/tips';
import alert from './alert/alert';
import qrcode from './qrcode/qrcode';
import bannerStar from './bannerStar';
import loading from './loading';



let commonModule = angular.module('app.common', [
	header.name,
	footer.name,
	breadNav.name,
	inputUpload.name,
	errorMsg.name,
	calendar.name,
	calendarLink.name,
	select.name,
	tree.name,
	popWindow.name,
	popSpecial.name,
	tips.name,
	alert.name,
	qrcode.name,
	bannerStar.name,
	loading.name
]);


String.prototype.gblen = function() {
	var len = 0;
	for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
			len += 2;
		} else {
			len++;
		}
	}
	return len;
};

// 截取前20个字符  中文2个  英文1个 来算
String.prototype.substrfirst20 = function() {
	let num = 0;
	let returnstr = '';
	for (var i = 0; i < this.length; i++) {
		if (num < 20) {
			if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
				num += 2;
			} else {
				num += 1;
			}
			returnstr += this[i];
		}
	}
	return returnstr;
};



export default commonModule;