import header from './header';
import footer from './footer';



let commonModule = angular.module('app.common', [
	header.name,
	footer.name
]);



export default commonModule;