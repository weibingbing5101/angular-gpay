/**
 * @desc 组件入口
*/
import Component from './calendar.comp';

let Module = angular.module('commoncalendar', [])
.linkComponent('gyCalendar', Component);

export default Module;