$(document).ready(function() {
    var dom = {
        counter: null,
        counter_1: $('#amr-lead-counter-1'),
        counter_2: $('#amr-lead-counter-2'),
        counter_3: $('#amr-lead-counter-3')
    };

    var xhrData = null;

    if (dom.counter_1.length === 0 && dom.counter_2.length === 0 && dom.counter_3.length === 0) {
        console.log('counters not found');
        return;
    }

    if (dom.counter_1.length !== 0) {
        dom.counter = dom.counter_1;
        xhrData = 'counterNumber=1';
        console.log('counter_1 found');

        start();
    }

    if (dom.counter_2.length !== 0) {
        dom.counter = dom.counter_2;
        xhrData = 'counterNumber=2';
        console.log('counter_2 found');

        start();
    }

    if (dom.counter_3.length !== 0) {
        dom.counter = dom.counter_3;
        xhrData = 'counterNumber=3';
        console.log('counter_3 found');

        start();
    }

    if (dom.counter_3.length !== 0) {

    }


    dom.counter.numberAnimate({
        animationTimes: [100, 500, 100]
    });

    function start() {
        putCounterValue();

        (function runInterval() {
            var interval = null;

            if (dom.counter_3.length !== 0) {
                interval = 1000 * 60 * 10;
            } else {
                interval = Math.floor((Math.random() * 10 + 5) * 1000);
            }


            console.log( 'random interval = ', interval );

            setTimeout(function(){
                putCounterValue();
                runInterval();
            }, interval);
        })();
    }

    function getCounterValue() {
        $.ajax({
            type: 'GET',
            url: 'backend/counter-lead.php',
            data: xhrData
        })
            .done(function (response, textStatus) {
                console.log('done: response = ', response);
                console.log('done: textStatus = ', textStatus);

                dom.counter.text( JSON.parse(response)['server_data'] * 1 );
            })
            .fail(function (response, textStatus) {
                console.log('fail: response = ', response);
                console.log('fail: textStatus = ', textStatus);
            });
    }

    function putCounterValue() {
        $.ajax({
            type: 'POST',
            url: 'backend/counter-lead.php',
            data: xhrData
        })
            .done(function(response, textStatus) {
                console.log('done: response = ', response);
                console.log('done: textStatus = ', textStatus);

                getCounterValue();
            })
            .fail(function(response, textStatus) {
                console.log('fail: response = ', response);
                console.log('fail: textStatus = ', textStatus);
            });
    }
});
