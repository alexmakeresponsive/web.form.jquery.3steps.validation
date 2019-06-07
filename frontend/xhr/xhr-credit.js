var initXHR = function ( formDataResult ) {
    var form                    = $('#amr-form-1');
    var formButton              = $('#amr-form-1 .button');
    var formButtonText          = $('#amr-form-1 .button .text');
    var formButtonPreloader     = $('#amr-form-1 .button .preloader');


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
        url: '/send-mail.php',
        data: formData
    })
    .done(function(response, textStatus) {
        console.log('done: response = ', response);
        console.log('done: textStatus = ', textStatus);

        showButtonSubmitStatus('Заявка отправлена');
        clearForm();
        sessionStorage.clear();

        window.location.replace("http://domain_name.ru/success");
    })
    .fail(function(response, textStatus) {
        console.log('fail: response = ', response);
        console.log('fail: textStatus = ', textStatus);

        showButtonSubmitStatus('Заявка не отправлена');
    });
};

var showButtonSubmitStatus = function (text) {
    var formButton              = $('#amr-form-1 .button');
    var formButtonText          = $('#amr-form-1 .button .text');
    var formButtonPreloader     = $('#amr-form-1 .button .preloader');
    var formButtonStatus        = $('#amr-form-1 .button .status');


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
    var inputAny                = $('#amr-form-1 input');
    var selectAny               = $('#amr-form-1 .nice-select');
    var niceSelectCurrentHtml   = [
        'выберите просрочку',
        'выберите регион',
        'Д.',
        'М.',
        'Г.',
        'выберите город'
    ];
    var checkboxAgreement       = $('#amr-form-1 input[name="agreement"]');
    var selectCity              = $('#amr-form-1 #cityWr .nice-select');

    //Clear inputs
    inputAny.each(function (index, input) {
        $(input).val('');
    });
    //Clear selects
    selectAny.each(function (index, select) {
        // console.log(index);
        // console.log($(select).find('.current'));
        $(select).find('.current').html( niceSelectCurrentHtml[index] );
    });
    //Set checkbox val to 'on'
    checkboxAgreement.val('on');
    //Disable city select
    selectCity.addClass('disable');
};
