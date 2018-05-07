require("./sass/style.scss");

require("jquery");

require('./jquery.isonscreen');

require('../build/sticky_section.js');

import TextPlugin from "gsap/TextPlugin";

require('../../i_message/build/i_message.js');


$(document).ready(function () {

    let mobile_breakpoint = 1500;

    let ww = $(window).width();

    let $i_message_desktop = $('.section-intro.demo-desktop .i-message');
    let $sticky_section_desktop = $('.section-intro.demo-desktop');

    let full_desktop_animation_played = false;
    let short_desktop_animation_played = false;
    let mobile_animation_played = false;

    let first_desktop_scene_is_played = false;

    let $first_mobile_imessage = $('.section-intro.demo-mobile .first-slide .i-message');
    let $second_mobile_imessage = $('.section-intro.demo-mobile .second-slide .i-message');

    $first_mobile_imessage.iMessage();
    $second_mobile_imessage.iMessage();


    function update_time_scale() {
        $i_message_desktop.iMessage('update_timescale', 10);
    }


    function first_desktop_scene() {
        TweenLite.to('.left-col .text-wrap', 1, {
            opacity: 1, onComplete: function () {

                $sticky_section_desktop.on('scrolling.ss', update_time_scale);

                $i_message_desktop.iMessage('play_dialog', [
                    {
                        type: 'receive',
                        text: "Test receive 2222  22221"
                    },
                    {
                        type: 'receive',
                        text: "Test receive 2"
                    },
                    {
                        type: 'send',
                        text: "Test send 1 send send send",
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
                            first_desktop_scene_is_played = true;
                            $sticky_section_desktop.off('scrolling.ss', update_time_scale);
                        }
                    }
                ]);
            }
        })
    }

    function second_desktop_scene() {

        if (!first_desktop_scene_is_played) return;

        $sticky_section_desktop.off('scrolling.ss', second_desktop_scene)

        $sticky_section_desktop.on('scrolling.ss', update_time_scale);
        $i_message_desktop.iMessage('update_timescale', 1);
        $i_message_desktop.iMessage('clear');

        TweenLite.to('.left-col .text-wrap', 1, {opacity: 0});
        TweenLite.to('.right-col .text-wrap', 1, {
            opacity: 1, onComplete: function () {

                $i_message_desktop.iMessage('play_dialog', [
                    {
                        type: 'receive',
                        text: "New Test receive"
                    },
                    {
                        type: 'send',
                        text: "New Test send 1 send send",
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
                            $sticky_section_desktop.stickySection('unwatch_scroll');
                            $sticky_section_desktop.stickySection('unstick');
                        }
                    }
                ]);
            }
        })
    }


    // update_layout_visibility();

    $(window).on('resize', full_desktop_layout);

    $(window).on('resize', short_desktop_layout);

    $(window).on('resize', mobile_layout);

    $(window).on('resize', function(){
        ww = $(window).width();
    })

    full_desktop_layout();
    short_desktop_layout();
    mobile_layout();


    function full_desktop_layout() {
        if (!short_desktop_animation_played && ww > mobile_breakpoint) {

            full_desktop_animation_played = true;
            $(window).off('resize', full_desktop_layout);

            $sticky_section_desktop.on('inArea.ss', function () {
                first_desktop_scene();
            })

            $sticky_section_desktop.on('scrolling.ss', second_desktop_scene)

            $i_message_desktop.iMessage();
            $sticky_section_desktop.stickySection();
        }
    }

    function short_desktop_layout() {
        if (mobile_animation_played && full_desktop_animation_played && !short_desktop_animation_played && ww > mobile_breakpoint) {

            console.log('sdf');

            short_desktop_animation_played = true;

            $(window).off('resize', short_desktop_layout);

            $i_message_desktop.iMessage('update_timescale', 1);
            $i_message_desktop.iMessage('clear');

            TweenLite.to('.left-col .text-wrap', 1, {opacity: 0});
            TweenLite.to('.right-col .text-wrap', 1, {
                opacity: 1, onComplete: function () {

                    $i_message_desktop.iMessage('play_dialog', [
                        {
                            type: 'receive',
                            text: "New Test receive"
                        },
                        {
                            type: 'send',
                            text: "New Test send 1 send send",
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
                            delay: "+=1"
                        }
                    ]);
                }
            })
        }
    }

    function mobile_layout() {

        if (ww >= mobile_breakpoint) return;

        mobile_animation_played = true;

        $(window).off('resize', mobile_layout);

        let first_animation_played = false;
        let second_animation_played = false;

        if (full_desktop_animation_played) {
            $sticky_section_desktop.stickySection('unwatch_scroll');
            $sticky_section_desktop.stickySection('unstick');
        }

        function play_first_mobile_dialog() {

            first_animation_played = true;

            $first_mobile_imessage.iMessage('play_dialog', [
                {
                    type: 'receive',
                    text: "Test receive 111111111"
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
                    delay: "+=1"
                }
            ]);
        }

        function play_second_mobile_dialog() {

            second_animation_played = true;

            $second_mobile_imessage.iMessage('play_dialog', [
                {
                    type: 'receive',
                    text: "Test receive 1111111"
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
                    delay: "+=1"
                }
            ]);
        }


        function is_on_screen_handler() {
            if ($('.section-intro.demo-mobile .first-slide').isOnScreen(0.8, 0.8) && !first_animation_played) {
                play_first_mobile_dialog();
            }

            if ($('.section-intro.demo-mobile .second-slide').isOnScreen(0.8, 0.8) && !second_animation_played) {
                play_second_mobile_dialog();
            }

            if (first_animation_played && second_animation_played) {
                $(window).off('scroll', is_on_screen_handler);
            }
        }

        $(window).on('scroll', is_on_screen_handler);

        is_on_screen_handler();
    }

});
