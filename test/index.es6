require("./sass/style.scss");

require("jquery");

require('../build/sticky_section.js');

import TextPlugin from "gsap/TextPlugin";

require('../../i_message/build/i_message.js');


$(document).ready(function () {


    let $i_message_demo = $('.i-message-demo');
    let $sticky_section = $('.section-intro');

    let first_scene_is_played = false;

    $sticky_section.on('inArea.ss', function () {
        first_scene();
    })

    $sticky_section.on('scrolling.ss', second_scene)


    function update_time_scale() {
        $i_message_demo.iMessage('update_timescale', 10);
    }


    function first_scene() {
        TweenLite.to('.left-col .text-wrap', 1, {
            opacity: 1, onComplete: function () {

                $sticky_section.on('scrolling.ss', update_time_scale);

                $i_message_demo.iMessage('play_dialog', [
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
                            first_scene_is_played = true;
                            $sticky_section.off('scrolling.ss', update_time_scale);
                        }
                    }
                ]);
            }
        })
    }

    function second_scene() {

        if (!first_scene_is_played) return;

        $sticky_section.off('scrolling.ss', second_scene)

        $sticky_section.on('scrolling.ss', update_time_scale);
        $i_message_demo.iMessage('update_timescale', 1);
        $i_message_demo.iMessage('clear');

        TweenLite.to('.left-col .text-wrap', 1, {opacity: 0});
        TweenLite.to('.right-col .text-wrap', 1, {
            opacity: 1, onComplete: function () {

                $i_message_demo.iMessage('play_dialog', [
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
                        after_play: function () {
                            $sticky_section.stickySection('unwatch_scroll');
                            $sticky_section.stickySection('unstick');
                        }
                    }
                ]);
            }
        })
    }


    $('.i-message-demo').iMessage();

    $('.section-intro').stickySection();
});