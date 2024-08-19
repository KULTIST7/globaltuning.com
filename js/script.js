$(document).ready(() => {
    let isRated = false;
    let selectedRate = 0;

    setTimeout(collapseAudioRecorder(), 100);
    setTimeout(addItems('small'), 100);
    setTimeout(addItems('medium'), 100);
    setTimeout(addItems('large'), 100);
    setTimeout(addItems('extra-large'), 100);

    $(window).on('resize', function () {
        collapseAudioRecorder();
        addItems('small');
        addItems('medium');
        addItems('large');
        addItems('extra-large');
    });

    $('.stand__speakers__item').on('click', function () {
        $('.stand__speakers__item').removeClass('active paused');
        $('.stand__audio-recorder__play-button').removeClass('disabled');
        $(this).addClass('active');

        $('.stand__audio-recorder__control').attr('src', $(this).attr('data-audio'));
        $('.stand__audio-recorder__control')[0].play();
        $('.stand__audio-recorder__play-button').addClass('active');

        $('.stand__audio-recorder__player').addClass('active');
        $('.stand__audio-recorder__player>div>p').html($($(this).children()[1]).text());
        $('.stand__audio-recorder__content>h3').html($($(this).children()[1]).text());

        $('.stand__audio-recorder__control')[0].onended = () => {
            $(this).removeClass('active');
            $('.stand__audio-recorder__play-button').removeClass('active');
            $('.stand__audio-recorder__player').removeClass('active');
        }
    });

    $('.stand__audio-recorder__play-button').on('click', function () {
        if (!$(this).hasClass('disabled')) {
            $(this).toggleClass('active');

            if ($(this).hasClass('active')) {
                $('.stand__audio-recorder__control')[0].play();
                $('.stand__audio-recorder__player').addClass('active');
                $('.stand__speakers__item').removeClass('paused');
            } else {
                $('.stand__audio-recorder__control')[0].pause();
                $('.stand__audio-recorder__player').removeClass('active');
                $('.stand__speakers__item').addClass('paused');
            }
        }
    });

    $('.stand__audio-recorder__rate>div>button').on('mouseenter', function () {
        $('.stand__audio-recorder__rate>div>button').removeClass('active');
        for (let i = 0; i < $(this).attr('data-rate'); i++) {
            $($('.stand__audio-recorder__rate>div>button')[i]).addClass('active');
        }
    });

    $('.stand__audio-recorder__rate>div').on('mouseleave', () => {
        $('.stand__audio-recorder__rate>div>button').removeClass('active');
        for (let i = 0; i < selectedRate; i++) {
            $($('.stand__audio-recorder__rate>div>button')[i]).addClass('active');
        }
    });

    $('.stand__audio-recorder__rate>div>button').on('click', function () {
        isRated = true;
        selectedRate = $(this).attr('data-rate');
    });

    $('#audio-recorder-volume').slider({
        animate: 'fast',
        min: 0,
        maxmax: 100,
        value: 60,
        classes: {
            "ui-slider": "slider-range",
            "ui-slider-handle": "slider-handle"
        },
        slide: function() {
            $('#audio-recorder-volume-container .stand__audio-recorder__slider__header>p').html(`${$('#audio-recorder-volume').slider('value')}/${$('#audio-recorder-volume').slider('option', 'max')}`);
            $('.stand__audio-recorder__control')[0].volume = $('#audio-recorder-volume').slider('value') / 100;
        },
        change: function() {
            $('#audio-recorder-volume-container .stand__audio-recorder__slider__header>p').html(`${$('#audio-recorder-volume').slider('value')}/${$('#audio-recorder-volume').slider('option', 'max')}`);
            $('.stand__audio-recorder__control')[0].volume = $('#audio-recorder-volume').slider('value') / 100;
        }
    });
    
    $('#audio-recorder-quality').slider({
        animate: 'fast',
        min: 0,
        maxmax: 100,
        value: 40,
        classes: {
            "ui-slider": "slider-range",
            "ui-slider-handle": "slider-handle"
        },
        slide: function() {
            $('#audio-recorder-quality-container .stand__audio-recorder__slider__header>p').html(`${$('#audio-recorder-quality').slider('value')}/${$('#audio-recorder-quality').slider('option', 'max')}`);
        },
        change: function() {
            $('#audio-recorder-quality-container .stand__audio-recorder__slider__header>p').html(`${$('#audio-recorder-quality').slider('value')}/${$('#audio-recorder-quality').slider('option', 'max')}`);
        }
    });
    
    $('#audio-recorder-quality2').slider({
        animate: 'fast',
        min: 0,
        maxmax: 100,
        value: 60,
        classes: {
            "ui-slider": "slider-range",
            "ui-slider-handle": "slider-handle"
        },
        slide: function() {
            $('#audio-recorder-quality2-container .stand__audio-recorder__slider__header>p').html(`${$('#audio-recorder-quality2').slider('value')}/${$('#audio-recorder-quality2').slider('option', 'max')}`);
        },
        change: function() {
            $('#audio-recorder-quality2-container .stand__audio-recorder__slider__header>p').html(`${$('#audio-recorder-quality2').slider('value')}/${$('#audio-recorder-quality2').slider('option', 'max')}`);
        }
    });


    $('.stand__audio-recorder__expand').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).html('подробнее');
            $('.stand__audio-recorder__content>h3').slideUp('fast');
            $('.stand__audio-recorder__average-rating').slideUp('fast');
            $('.stand__audio-recorder__rate').slideUp('fast');
            $('.stand__audio-recorder__sliders').slideUp('fast');
            $('.stand__audio-recorder__play-button').slideUp('fast');
            $(this).removeClass('active');
        } else {
            $(this).html('свернуть');
            $('.stand__audio-recorder__content>h3').slideDown('fast');
            $('.stand__audio-recorder__average-rating').slideDown('fast');
            $('.stand__audio-recorder__rate').slideDown('fast');
            $('.stand__audio-recorder__sliders').slideDown('fast');
            $('.stand__audio-recorder__play-button').slideDown('fast');
            $(this).addClass('active');
        }
    });
});

function collapseAudioRecorder() {
    if (window.innerWidth <= 992 && !$('.stand__audio-recorder__expand').hasClass('active')) {
        $('.stand__audio-recorder__content>h3').slideUp(0);
        $('.stand__audio-recorder__average-rating').slideUp(0);
        $('.stand__audio-recorder__rate').slideUp(0);
        $('.stand__audio-recorder__sliders').slideUp(0);
        $('.stand__audio-recorder__play-button').slideUp(0);
    } else {
        $('.stand__audio-recorder__content>h3').slideDown(0);
        $('.stand__audio-recorder__average-rating').slideDown(0);
        $('.stand__audio-recorder__rate').slideDown(0);
        $('.stand__audio-recorder__sliders').slideDown(0);
        $('.stand__audio-recorder__play-button').slideDown(0);
    }
}

function addItems(classOfType) {
    let itemToAdd = `<div class="stand__speakers__item stand__speakers__item_empty"><div><img src="images/svg/empty-speaker.svg" alt="" class="speaker ${classOfType}" loading="lazy"><img class="plus" src="images/svg/plus.svg" alt="" loading="lazy"><div class="indicator"></div></div></div>`;
    let itemsInRow = Math.round(document.querySelector('.stand__speakers__content').offsetWidth / (document.querySelector('.stand__speakers__item') != null ? document.querySelector('.stand__speakers__item').offsetWidth : 6));

    $(`.stand__speakers__item_empty>div>.${classOfType}`).parent().parent().remove();

    for (let e = 0; e < $('.stand__speakers__content').length; e++) {
        let currentItemsInSpeakers = $($('.stand__speakers__content')[e]).children().find($(`.stand__speakers__item>div>.${classOfType}`)).length;
        let AmountitemsNeedToAdd = itemsInRow - (currentItemsInSpeakers % itemsInRow);
        
        if (currentItemsInSpeakers == 0) {
            for (let i = 0; i < AmountitemsNeedToAdd; i++) {
                $($('.stand__speakers__content')[e]).prepend(itemToAdd);
            }
        } else {
            for (let i = 0; i < AmountitemsNeedToAdd; i++) {
                $($($($('.stand__speakers__content')[e]).children().find($(`.stand__speakers__item>div>.${classOfType}`)).parent())[$($($('.stand__speakers__content')[e]).children().find($(`.stand__speakers__item>div>.${classOfType}`)).parent()).length - 1]).parent().after(itemToAdd);
            }
        }
    }
}