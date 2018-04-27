require("./sass/style.scss");

require ("jquery");

require('../build/sticky_section.js');


$(document).ready(function () {

    $('.section-intro').stickySection();

    $('.section-intro').on('scrolling.ss', function(){
        console.log('event');
    })
});