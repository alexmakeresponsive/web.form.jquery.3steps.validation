var initDataXHR = function () {
    var form                    = $('#amr-form-5');
    var formButton              = $('#amr-form-5-button-submit');
    var formButtonText          = $('#amr-form-5-button-submit .text');
    var formButtonPreloader     = $('#amr-form-5-button-submit .preloader');


    formButton.addClass('disable');
    formButtonText.removeClass('op-1');
    formButtonText.addClass('op-0');
    formButtonPreloader.removeClass('op-0');
    formButtonPreloader.addClass('op-1');


    $.ajax({
        type: 'POST',
        url: '',
        data: new FormData( form[0] ),
        contentType: false,
        cache: false,
        processData:false
    })
        .done(function(response, textStatus) {
            // console.log('done: response = ', JSON.parse(response));
//                console.log('done: response = ', response);
//             console.log('done: textStatus = ', textStatus);

            showButtonSubmitStatus('Отправлено');
            clearForm();
            sessionStorage.clear();

            window.location.replace("");
        })
        .fail(function(response, textStatus) {
            console.log('fail: response = ', JSON.parse(response.responseText));
//                console.log('fail: response = ', response);
            console.log('fail: textStatus = ', textStatus);

            showButtonSubmitStatus('Не отправлено');
        });



    var showButtonSubmitStatus = function (text) {
        var formButton              = $('#amr-form-5-button-submit');
        var formButtonText          = $('#amr-form-5-button-submit .text');
        var formButtonPreloader     = $('#amr-form-5-button-submit .preloader');
        var formButtonStatus        = $('#amr-form-5-button-submit .status');


        formButtonPreloader.removeClass('op-1');
        formButtonPreloader.addClass('op-0');
        formButtonStatus.addClass('op-1');
        formButtonStatus.html(text);


        setTimeout(function() {
            formButtonStatus.removeClass('op-1');
            formButtonStatus.addClass('op-0');
            formButtonText.removeClass('op-0');
            formButtonText.addClass('op-1');
            formButton.removeClass('disable');
        }, 2000);
    };

    var clearForm = function () {
        var inputs       = $('#amr-form-5 input');
        var textarea     = $('#amr-form-5 textarea');

        $.each(inputs, function (index, item) {
            $(item).val('');
        });
        $.each(textarea, function (index, item) {
            $(item).val('');
        });
    };
};
