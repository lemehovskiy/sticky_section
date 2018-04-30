require("./sass/style.scss");

require("jquery");

require('../build/sticky_section.js');

import TextPlugin from "gsap/TextPlugin";

require('../../i_message/build/i_message.js');


$(document).ready(function () {

    $('.i-message-demo').iMessage();

    $('.section-intro').stickySection();

    $('.section-intro').on('inArea.ss', function () {
        console.log('inArea');

        $('.i-message-demo').iMessage('play_dialog', [
            {
                type: 'receive',
                text: "Test receive 1",
                after_play: function () {
                    console.log('received');
                }
            },
            {
                type: 'send',
                text: "Test send 1",
                delay: "+=1",
                after_play: function () {
                    console.log('send');
                    $('.i-message-demo').iMessage('clear');

                    $('.i-message-demo').iMessage('play_dialog', [
                        {
                            type: 'receive',
                            text: "New Test receive 1",
                            after_play: function () {
                                console.log('received');
                            }
                        },
                        {
                            type: 'send',
                            text: "New Test send 1",
                            delay: "+=1",
                            after_play: function () {
                                console.log('send');
                            }
                        }
                    ]);
                }
            }
        ]);
    })

    $('.section-intro').on('scrolling.ss', function () {
        $('.i-message-demo').iMessage('update_timescale', 10);
        $('.i-message-demo').iMessage('update_timescale', 10);
    })


    $('.play-btn').on('click', function () {
        $('.i-message-demo').iMessage('play');
        $(this).fadeOut();
    })

    $('.timescale-btn').on('click', function () {
        $('.i-message-demo').iMessage('update_timescale', 10);
    })

});