require("./sass/style.scss");

require("jquery");

require('../build/sticky_section.js');

import TextPlugin from "gsap/TextPlugin";

require('../../i_message/build/i_message.js');


$(document).ready(function () {

    $('.section-intro').on('inArea.ss', function () {

        TweenLite.to('.left-col .text-wrap', 1, {opacity: 1, onComplete: function(){
            $('.section-intro').on('scrolling.ss', function () {
                $('.i-message-demo').iMessage('update_timescale', 10);
            });

            $('.i-message-demo').iMessage('play_dialog', [
                {
                    type: 'receive',
                    text: "Test receive 1"
                },
                {
                    type: 'receive',
                    text: "Test receive 2"
                },
                {
                    type: 'send',
                    text: "Test send 1",
                    delay: "+=1"
                },
                {
                    type: 'receive',
                    text: "Test receive 3"
                },
                {
                    type: 'receive',
                    text: "Test receive 4"
                },
                {
                    type: 'send',
                    text: "Test send 2",
                    delay: "+=1"
                },
                {
                    type: 'send',
                    text: "Test send 3",
                    delay: "+=1",
                    after_play: function () {
                        second_slide();
                    }
                }
            ]);
        }})
    })


    function second_slide(){
        $('.i-message-demo').iMessage('clear');
        $('.i-message-demo').iMessage('update_timescale', 1);

        TweenLite.to('.right-col .text-wrap', 1, {opacity: 1, onComplete: function(){

            $('.i-message-demo').iMessage('play_dialog', [
                {
                    type: 'receive',
                    text: "New Test receive 1"
                },
                {
                    type: 'send',
                    text: "New Test send 1",
                    delay: "+=1"
                },
                {
                    type: 'receive',
                    text: "New Test receive 2"
                },
                {
                    type: 'send',
                    text: "New Test send 2",
                    delay: "+=1"
                },
                {
                    type: 'receive',
                    text: "New Test receive 3"
                },
                {
                    type: 'send',
                    text: "New Test send 3",
                    delay: "+=1",
                    after_play: function(){
                        $('.section-intro').stickySection('unstick');
                    }
                }
            ]);
        }})
    }



    $('.i-message-demo').iMessage();

    $('.section-intro').stickySection();
});