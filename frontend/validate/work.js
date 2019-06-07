$(document).ready(function() {

    var form              = $('#amr-form-2');
    var inputAny          = $('#amr-form-2 input');
    var inputNoActive          = $('#amr-form-2 input.no-active');

    //Step 1
    var inputNumberPhone  = $('#amr-form-2 input[name="number-phone"]');        //TODO: change like this $('#amr-form-2 input')
    var inputName         = $('#amr-form-2 input[name="name"]');

    var formStep = null;
        formStep = 1;

    var formOptions = {
        step1: {

        }
    };

    var inputsValidateStatus = {    //TODO add secure store for validation inputs
        step1: {
            numberPhone:    false,
            name:           false
        }
    };



    //Set no active inputs
    inputNoActive.each(function (index, input) {
        // $(input).on( 'click', function (e) {
        //     e.preventDefault();
        //     return false;
        // });
    });


    //Validation Functions
    //1
    var validateTextRussianOnly = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        var input  = event.target;
        var inputValue  = event.target.value;
        var inputName = event.target.name;
        var errorStatus = inputValue.search(/[^ ,. а-яА-Я \s-]+/g);

        //Change validate status
        if ( inputName === 'name' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step1.name = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step1.name = true;
            }
        }
    };
    //2
    var validatePhoneNumber = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        event.preventDefault();

        var inputValue;
        var input = event.target;
        var inputName = event.target.name;

        if ( event.keyCode === 8 ) {
            // console.log( inputNumberPhone.val().length );
            // console.log( 'before slice = ', event.target.value.length );
            // console.log( 'before slice = ', event.target.value );
            // console.log( 'after slice = ', event.target.value.slice(0, -1).length );
            // console.log( 'after slice = ', event.target.value.slice(0, -1) );
            $(input).val( event.target.value.slice(0, -1) );
        }

        // console.log('etc length = ', event.target.value.length);

        if (event.key) {
            inputValue = event.target.value.slice(2, event.target.value.length).replace(/[^0-9]+/g, '') + event.key.replace(/[^0-9]+/g, '');
        } else {
            //when click mouse to outside
            inputValue = event.target.value.slice(2, event.target.value.length).replace(/[^0-9]+/g, '');
        }
        // console.log('e.t.v = ', event.target.value);
        // console.log('inputValue = ', inputValue);
        // console.log('inputValue = ', event.key);


        if (inputValue.length <= 10 && event.keyCode !== 8 ) {
            var inputValueArray = inputValue.split('').map(function (item, i) {
                if (i === 0) {
                    return ' (' + item;
                }
                if (i === 2) {
                    return item + ') - ';
                }
                if (i === 5 || i === 7 ) {
                    return item + '-';
                }
                return item;
            });

            $(input).val( '+7' + inputValueArray.join('') );
        }

        // console.log('inputNumberPhone inputValue = ', inputValue);

        if ( inputName === 'number-phone' ) {
            if ( inputValue.length < 10 || inputValue.length > 10 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step1.numberPhone = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step1.numberPhone = true;
            }
        }

        return;
    };




    //Bind events
    //Step 1
    inputName.on( 'keydown focusout', validateTextRussianOnly );
    inputNumberPhone.on( 'keydown focusout', validatePhoneNumber );








    //Set store for placeholders
    var storePlaceHolderCurrent = {
        //add dynamic fields here
    };

    //Hide placeholder when ckick to input
    inputAny.on( 'click', function(event) {
        var input            = event.target;
        var inputPlaceholder = input.placeholder;
        var inputName        = input.name;

        storePlaceHolderCurrent[inputName] = inputPlaceholder;
        $(input).attr('placeholder', '');

        // console.log( 'storePlaceHolderCurrent =', storePlaceHolderCurrent );
    });
    inputAny.on( 'focusout', function(event) {
        var input            = event.target;
        // var inputPlaceholder = input.placeholder;
        var inputName        = input.name;

        $(input).attr('placeholder', storePlaceHolderCurrent[inputName]);
    });


    //Check
    //Check empty inputs
    inputAny.on( 'focusout', function(event) {
        var inputValue  = event.target.value;
        var input  = event.target;

        if ( inputValue === '' ) {
            $(input).addClass('validation-error');
        } else {
            // $(input).removeClass('validation-error');
        }
    });



    //Click to submit button
    $(form).submit(function(event) {
        event.preventDefault();

        console.log( formStep );


        var hasEmptyInputs     = false;
        var hasEmptyFields     = false;

        var hasNotValidatedFields = false;


        console.log('try submit');

        inputAny.each(function (index, input) {
            if ( $(input).val() === '' ) {
                $(input).addClass('validation-error');
                hasEmptyInputs = true;
            }
        });

        if ( !hasEmptyInputs ) {
            hasEmptyFields = false;
        } else {
            hasEmptyFields = true;
        }

        console.log('hasEmptyFields = ', hasEmptyFields);


        if ( formStep === 1 ) {
            //Check inputsValidateStatus for current step
            for (key in inputsValidateStatus[ 'step' + formStep]) {
                // console.log(key);
                // console.log(inputsValidateStatus[key]);

                if ( !inputsValidateStatus[ 'step' + formStep][key] ) {
                    hasNotValidatedFields = true;
                }
            }
        }


        if ( !hasEmptyFields && !hasNotValidatedFields ) {

            if ( formStep === 1 ) {
                var formDataStep1 = $(form).serialize();
                var sessionStorageStep1Obj = {
                    form: {
                        data: {
                            step1: formDataStep1
                        }
                    }
                };
                console.log( 'formDataStep1 = ', formDataStep1 );

                var sessionStorageStep1ObjSerialize = JSON.stringify( sessionStorageStep1Obj );

                sessionStorage['amr'] = sessionStorageStep1ObjSerialize;    //TODO: remove ['amr'] if user close browser

            }

            if ( formStep === 1 ) {
                var formDataStep1String = JSON.parse(sessionStorage['amr']).form.data.step1;
                var formDataStep2String = $(form).serialize();

                console.log(formDataStep1String);
                console.log(formDataStep2String);
                console.log( $(form) );

                console.log('send form');


                var formDataResult = formDataStep1String + '&' + formDataStep2String;
                console.log(formDataResult);

                initWorkXHR( formDataResult );
            }

        } else {
            console.log(hasEmptyInputs);

            console.log('hasNotValidatedFields = ',hasNotValidatedFields);
            console.log(inputsValidateStatus[ 'step' + formStep]);


            console.log('form not valid');
        }
    });

});
