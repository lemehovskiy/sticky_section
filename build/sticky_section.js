/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/sticky_section
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var StickySection = function () {
        function StickySection(element, options) {
            _classCallCheck(this, StickySection);

            var self = this;

            //extend by function call
            self.settings = $.extend(true, {

                test_property: false

            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('sticky-section');
            self.settings = $.extend(true, self.settings, self.data_options);

            self.scroll_top = $(window).scrollTop();

            self.in_area = false;

            self.scroll_counter = 0;

            self.scroll_inprogress = false;

            self.scroll_watch = true;

            self.init();
        }

        _createClass(StickySection, [{
            key: 'init',
            value: function init() {
                var self = this;

                self.scroll_handler();

                $(window).on('scroll', function () {
                    self.scroll_handler();
                });

                $(window).on('mousewheel', function (e) {
                    if (self.in_area) {
                        self.mouse_wheel_handler();
                    }
                });

                document.addEventListener('touchmove', function (e) {

                    if (self.in_area) {
                        self.mouse_wheel_handler();
                    }
                }, false);
            }
        }, {
            key: 'scroll_handler',
            value: function scroll_handler() {
                var self = this;

                self.scroll_top = $(window).scrollTop();

                if (!self.in_area && self.scroll_watch && self.is_on_screen(0.6, 0.6)) {

                    console.log('is_on_screen');

                    self.stick();

                    self.stop_body_scrolling(true);

                    $('html, body').animate({ scrollTop: self.$element.offset().top }, 300, 'linear', function () {
                        console.log('animate');
                    });
                }
            }
        }, {
            key: 'stick',
            value: function stick() {
                var self = this;

                self.in_area = true;

                self.$element.trigger('inArea.ss');

                $('body').css({
                    'overflow': 'hidden'
                });
            }
        }, {
            key: 'unstick',
            value: function unstick() {
                var self = this;

                self.in_area = false;

                $('body').css({
                    'overflow': 'visible'
                });

                self.stop_body_scrolling(false);
            }
        }, {
            key: 'stop_body_scrolling',
            value: function stop_body_scrolling(bool) {
                var self = this;

                if (bool === true) {
                    document.body.addEventListener("touchmove", self.freezeVp, false);
                } else {
                    document.body.removeEventListener("touchmove", self.freezeVp, false);
                }
            }
        }, {
            key: 'freezeVp',
            value: function freezeVp(e) {
                e.preventDefault();
            }
        }, {
            key: 'watch_scroll',
            value: function watch_scroll() {
                var self = this;

                self.scroll_watch = true;
            }
        }, {
            key: 'unwatch_scroll',
            value: function unwatch_scroll() {
                var self = this;

                self.scroll_watch = false;
            }
        }, {
            key: 'mouse_wheel_handler',
            value: function mouse_wheel_handler() {
                var self = this;

                if (!self.scroll_inprogress) {
                    self.scroll_inprogress = true;
                    self.scroll_counter++;

                    self.$element.trigger('scrolling.ss');
                }

                clearTimeout($.data(this, 'scrollTimer'));

                $.data(this, 'scrollTimer', setTimeout(function () {
                    self.scroll_inprogress = false;
                }, 50));
            }
        }, {
            key: 'is_on_screen',
            value: function is_on_screen(x_offset, y_offset) {

                var self = this;

                var win = $(window),
                    viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                },
                    height = self.$element.outerHeight(),
                    width = self.$element.outerWidth(),
                    bounds = self.$element.offset(),
                    visible,
                    deltas;

                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();

                if (!width || !height) return false;

                bounds.right = bounds.left + width;
                bounds.bottom = bounds.top + height;

                visible = !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);

                if (!visible) return false;

                deltas = {
                    top: Math.min(1, (bounds.bottom - viewport.top) / height),
                    bottom: Math.min(1, (viewport.bottom - bounds.top) / height),
                    left: Math.min(1, (bounds.right - viewport.left) / width),
                    right: Math.min(1, (viewport.right - bounds.left) / width)
                };

                return deltas.left * deltas.right >= x_offset && deltas.top * deltas.bottom >= y_offset;
            }
        }]);

        return StickySection;
    }();

    $.fn.stickySection = function () {
        var $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i = void 0,
            ret = void 0;
        for (i = 0; i < length; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].sticky_section = new StickySection($this[i], opt);else ret = $this[i].sticky_section[opt].apply($this[i].sticky_section, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);

/***/ })
/******/ ]);