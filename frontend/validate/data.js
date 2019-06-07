
$( document ).ready(function() {


    var checkboxAny       = $('#amr-form-5 input[type="checkbox"]');
    var checkboxAgreement = $('#amr-form-5 input[name="agreement"]');
    var inputFileAny       = $('#amr-form-5 input[type="file"]');
    var forms = $('.js-amr-form-5');


    forms.each(function (index, form) {
        $(form).submit(formSubmit);
    });


    function checkEmptyInputs( form ) {
        var fieldIsEmpty = false;

        //Check input is empty
        $(form).find('input, textarea').each(function(){
            if ( $(this).val().length === 0 ) {
                $(this).addClass('validation-error');

                fieldIsEmpty = true;
            } else {
                $(this).removeClass('validation-error');
            }
        });

        //Check input type = file
        $(form).find('input[type="file"]').each(function(){
            if ( $(this).val().length === 0 ) {
                $(this).parents('.button').addClass('validation-error');

                fieldIsEmpty = true;
            } else {
                $(this).parents('.button').removeClass('validation-error');
            }
        });

        if (fieldIsEmpty) {
            return false;
        } else {
            return true;
        }
    }

    function checkEmptyCheckboxes( form ) {
        var fieldIsEmpty = false;

        //Check input is empty
        $(form).find('input[type="checkbox"]').each(function(){
            if ( $(this).val() === 'off' ) {
                fieldIsEmpty = true;
            }
        });

        // console.log('fieldIsEmpty = ', fieldIsEmpty);

        if (fieldIsEmpty) {
            return false;
        } else {
            return true;
        }
    }


    function checkboxChangeValue(event) {
        var target = $(event.target);
        target.val() === 'on' ? target.val('off') : target.val('on');

        // console.log(target.val());
    };


    function inputFileAnyValidate(event) {
        var target = $(event.target);

        if ( target.val().length === 0 ) {
            target.parents('.button').removeClass('ready');
            target.parents('.button').addClass('validation-error');
            target.parents('.button').find('.text').html('ОК');

        } else {
            target.parents('.button').removeClass('validation-error');
            target.parents('.button').addClass('ready');
            target.parents('.button').find('.text').html('Загрузить фото');
        }

        // console.log(target.val().length);
    };


    function formSubmit(event) {
        event.preventDefault();

        var form         = event.target;
            // console.log(form);

        if (!form) {
            return;
        }

        if ( !checkEmptyInputs( form ) ) {
            console.log('form is empty');
            return true;
        }

        if ( !checkEmptyCheckboxes( form ) ) {
            console.log('checkbox is off');
            return true;
        }

        initDataXHR();
    }



    checkboxAny.on( 'click', checkboxChangeValue);
    inputFileAny.on( 'change', inputFileAnyValidate);

    checkboxAgreement.trigger('click');
    checkboxAgreement.val('on');
});
