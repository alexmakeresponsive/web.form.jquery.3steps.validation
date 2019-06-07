var initIPXHR = function ( formDataResult ) {
    var form                    = $('#amr-form-3');
    var formButton              = $('#amr-form-3 .button');
    var formButtonText          = $('#amr-form-3 .button .text');
    var formButtonPreloader     = $('#amr-form-3 .button .preloader');


    formButton.addClass('disable');
    formButtonText.removeClass('op-1');
    formButtonText.addClass('op-0');
    formButtonPreloader.removeClass('op-0');
    formButtonPreloader.addClass('op-1');


    // Serialize the form data.
    var formData = formDataResult;

    $.ajax({
        type: 'POST',
        // url: '',
        url: '',
        data: formData
    })
    .done(function(response, textStatus) {
        console.log('done: response = ', response);
        console.log('done: textStatus = ', textStatus);

        showButtonSubmitStatus('Заявка отправлена');
        clearForm();
        sessionStorage.clear();

        window.location.replace("http://domain_name.ru/success/#ip");
    })
    .fail(function(response, textStatus) {
        console.log('fail: response = ', response);
        console.log('fail: textStatus = ', textStatus);

        showButtonSubmitStatus('Заявка не отправлена');
    });
};

var showButtonSubmitStatus = function (text) {
    var formButton              = $('#amr-form-3 .button');
    var formButtonText          = $('#amr-form-3 .button .text');
    var formButtonPreloader     = $('#amr-form-3 .button .preloader');
    var formButtonStatus        = $('#amr-form-3 .button .status');


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
    // var inputAny                = $('#amr-form-3 input');

    var inputNunberPhone       = $('#amr-form-3 input[name="name"]');
    var inputName       = $('#amr-form-3 input[name="number-phone"]');

    var stepSlider1 = document.getElementById('slider-1');
    var stepSlider2 = document.getElementById('slider-2');

    if (stepSlider1) {
        stepSlider1.noUiSlider.set(100000);
    }
    if (stepSlider2) {
        stepSlider2.noUiSlider.set(2);
    }


    //Clear inputs
    inputNunberPhone.val('');
    inputName.val('');



};
