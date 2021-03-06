/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/sticky_section
 */

'use strict';

(function ($) {

    class StickySection {

        constructor(element, options) {

            let self = this;

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

        init() {
            let self = this;


            self.scroll_handler();

            $(window).on('scroll', function () {
                self.scroll_handler();
            })

            $(window).on('wheel', function (e) {
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

        scroll_handler() {
            let self = this;

            self.scroll_top = $(window).scrollTop();

            if (!self.in_area && self.scroll_watch && self.is_on_screen(0.6, 0.6)) {

                self.stick();

                self.stop_body_scrolling(true);

                $('html, body').animate({scrollTop: self.$element.offset().top}, 300, 'linear', function () {
                })
            }
        }

        stick(){
            let self = this;

            self.in_area = true;

            self.$element.trigger('inArea.ss');

            $('body').css({
                'overflow': 'hidden'
            })

        }

        unstick() {
            let self = this;

            self.in_area = false;

            $('body').css({
                'overflow': 'visible'
            })

            self.stop_body_scrolling(false);
        }

        stop_body_scrolling(bool) {
            let self = this;

            if (bool === true) {
                document.body.addEventListener("touchmove", self.freezeVp, false);
            } else {
                document.body.removeEventListener("touchmove", self.freezeVp, false);
            }
        }

        freezeVp (e) {
            e.preventDefault();
        };
        
        watch_scroll(){
            let self = this;

            self.scroll_watch = true;
        }

        unwatch_scroll() {
            let self = this;

            self.scroll_watch = false;
        }

        mouse_wheel_handler() {
            let self = this;

            if (!(self.scroll_inprogress)) {
                self.scroll_inprogress = true;
                self.scroll_counter++;

                self.$element.trigger('scrolling.ss');
            }

            clearTimeout($.data(this, 'scrollTimer'));

            $.data(this, 'scrollTimer', setTimeout(function () {
                self.scroll_inprogress = false;
            }, 50));
        }

        is_on_screen(x_offset, y_offset) {

            let self = this;

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

            visible = (
                !(viewport.right < bounds.left ||
                viewport.left > bounds.right ||
                viewport.bottom < bounds.top ||
                viewport.top > bounds.bottom)
            );

            if (!visible) return false;

            deltas = {
                top: Math.min(1, (bounds.bottom - viewport.top) / height),
                bottom: Math.min(1, (viewport.bottom - bounds.top) / height),
                left: Math.min(1, (bounds.right - viewport.left) / width),
                right: Math.min(1, (viewport.right - bounds.left) / width)
            };

            return (deltas.left * deltas.right) >= x_offset && (deltas.top * deltas.bottom) >= y_offset;
        }

    }


    $.fn.stickySection = function () {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].sticky_section = new StickySection($this[i], opt);
            else
                ret = $this[i].sticky_section[opt].apply($this[i].sticky_section, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };

})(jQuery);