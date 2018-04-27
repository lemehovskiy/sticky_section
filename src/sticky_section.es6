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

        }
    }


    $.fn.stickySection = function() {
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