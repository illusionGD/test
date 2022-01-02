/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ (() => {

eval("console.log('./p/ssdsdas');\n\nfunction test() {\n  console.log(1 * 28 * 3); // return new Promise();\n}\n\n//# sourceURL=webpack://webpack-test/./public/js/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _public_css_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../public/css/index.less */ \"./public/css/index.less\");\n/* harmony import */ var _public_js_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../public/js/index */ \"./public/js/index.js\");\n/* harmony import */ var _public_js_index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_js_index__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nif (false) {}\n\n(function (window) {\n  /**\r\n   * rem设配\r\n   */\n  var doc = window.document; // 获取文档对象\n\n  var docEle = doc.documentElement; // 获取文档元素对象\n  // 动态改变rem值，一旦屏幕发生改变，自动调用该方法重置\n\n  function refreshRem() {\n    // 获取设备宽度\n    var _width = docEle.getBoundingClientRect().width; // 将屏幕的1/10设置为rem的值\n\n    var _rem = _width / 10; // 重置页面的rem的大小\n\n\n    docEle.style.fontSize = _rem + 'px';\n  } // 监听屏幕改变事件\n\n\n  window.addEventListener('resize', refreshRem());\n  /**\r\n   * 轮播图\r\n   */\n\n  var swiper = document.querySelector('.swiper-images'); // 获取轮播图可视化区域\n\n  var swiperList = document.querySelector(\"#swiper-list\"); // 轮播图列表\n\n  var swiperChildren = swiperList.children; // 轮播图的子节点\n\n  var childWidth = swiper.offsetWidth; //获取可视化区域的宽度\n\n  swiperList.style.width = childWidth * swiperChildren.length + 'px'; // 动态设置轮播图的总长\n  // 设置每个图片的宽度，设置为可视化区域的宽度(整个屏幕)\n\n  for (var i = 0; i < swiperChildren.length; i++) {\n    swiperChildren[i].style.width = swiper.offsetWidth + 'px';\n  }\n\n  var swiperIndex = 0; // 轮播图下标\n\n  var arrowL = document.querySelector(\".left-arrow\"); // 获取左箭头实例\n\n  var arrowR = document.querySelector(\".rigth-arrow\"); // 获取右箭头实例\n\n  arrowL.addEventListener('click', leftArrowEvent);\n  arrowR.addEventListener('click', rigthArrowEvent); // 左箭头点击事件\n\n  function leftArrowEvent() {\n    if (swiperIndex > 0) {\n      swiperIndex -= 1;\n    } else {\n      swiperIndex = swiperChildren.length - 1;\n    }\n\n    swiperMove();\n  } // 右箭头点击事件\n\n\n  function rigthArrowEvent() {\n    if (swiperIndex < swiperChildren.length - 1) {\n      swiperIndex += 1;\n    } else {\n      swiperIndex = 0;\n    }\n\n    swiperMove();\n  } // 移动轮播图\n\n\n  function swiperMove() {\n    swiperList.style.left = -swiperIndex * childWidth + 'px';\n  } // 设置定时器，定时滚轮轮播图\n\n\n  setInterval(function swpierTimer() {\n    rigthArrowEvent();\n  }, 3000);\n})(window);\n\n//# sourceURL=webpack://webpack-test/./src/index.js?");

/***/ }),

/***/ "./public/css/index.less":
/*!*******************************!*\
  !*** ./public/css/index.less ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack-test/./public/css/index.less?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;