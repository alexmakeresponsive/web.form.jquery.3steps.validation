$(document).ready(function() {

    var form              = $('#amr-form-1');
    var inputAny          = $('#amr-form-1 input');
    var checkboxAny       = $('#amr-form-1 input[type="checkbox"]');
    var selectAny         = $('#amr-form-1 .nice-select');

    //Step 1
    var inputAmount       = $('#amr-form-1 input[name="amount"]');
    var inputNumberPhone  = $('#amr-form-1 input[name="number-phone"]');        //TODO: change like this $('#amr-form-1 input')
    var inputName         = $('#amr-form-1 input[name="name"]');
    var inputAddressEmail = $('#amr-form-1 input[name="address-e-mail"]');
    var checkboxAgreement = $('#amr-form-1 input[name="agreement"]');

    //Step 2
    var inputPassportSeriesAndNumber     = $('#amr-form-1 input[name="passport-series-and-number"]');
    var inputPassportUnitCode     = $('#amr-form-1 input[name="passport-unit-code"]');
    var inputPassportUnitName     = $('#amr-form-1 input[name="passport-unit-name"]');
    var inputPassportPlaceBirthday     = $('#amr-form-1 input[name="passport-place-birthday"]');

    var inputLocationCurrentRegion     = $('#amr-form-1 input[name="location-current-region"]');
    var inputLocationCurrentLocality     = $('#amr-form-1 input[name="location-current-locality"]');
    var inputLocationCurrentStreet   = $('#amr-form-1 input[name="location-current-street"]');
    var inputLocationCurrentBuildingNumber   = $('#amr-form-1 input[name="location-current-building-number"]');
    var inputLocationCurrentFlatNumber   = $('#amr-form-1 input[name="location-current-flat-number"]');

    var inputJobOfficeNumberPhone = $('#amr-form-1 input[name="job-office-number-phone"]');
    var inputJobSalary            = $('#amr-form-1 input[name="job-salary"]');
    var inputJobOfficeName            = $('#amr-form-1 input[name="job-office-name"]');
    var inputJobPosition            = $('#amr-form-1 input[name="job-position"]');
    var inputJobCurrentExperience            = $('#amr-form-1 input[name="job-current-experience"]');
    var inputJobOfficeAddress            = $('#amr-form-1 input[name="job-office-address"]');

    var checkboxJobStatusHidden         = $('#amr-form-1 input[name="job-status"][type="hidden"]');
    var checkboxJobStatus         = $('#amr-form-1 input[name="job-status"][type="checkbox"]');
    var jobDataContainer          = $('#amr-form-1 #job-data-container');

    var formStep = null;

    var formOptions = {
        step1: {
            amount: {
                min: ( 5 * 1000 ),
                max: ( 3 * 1000 * 100 )
            }
        }
    };

    if ( checkboxJobStatus.length !== 0 ) {
        formStep = 2;
    } else {
        formStep = 1;
    }


    if ( form.length === 0 ) {
        // setTimeout(function() {
        //     window.location.replace("http://domain_name.ru/credit");
        // }, 2000);
    }



    var inputsValidateStatus = {    //TODO add secure store for validation inputs
        step1: {
            amount:         false,
            // story:      false,
            // region:     false,
            numberPhone:    false,
            // agreement:  false,
            name:           false,
            // dob_Day:    false,
            // dob_Month:  false,
            // dob_Year:   false,
            // city:       false,
            addressEmail:   false
        },
        step2: {
            passport: {
                SN:    false,
                UC:    false,
                UN:    false,
                PB:    false
            },
            location: {
                CR:   false,
                CL:   false,
                CS:   false,
                CBN:  false,
                CFN:  false
            },
            job: {
                ON:   false,
                P:    false,
                OA:   false,
                ONP:  false,
                S:    false,
                CE:   false
            }
        }
    };



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

        if ( inputName === 'passport-unit-name' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.passport.UN = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.passport.UN = true;
            }
        }

        if ( inputName === 'passport-place-birthday' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.passport.PB = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.passport.PB = true;
            }
        }

        if ( inputName === 'location-current-region' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.location.CR = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.location.CR = true;
            }
        }

        if ( inputName === 'location-current-locality' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.location.CL = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.location.CL = true;
            }
        }
    };
    //2
    var validateJobOfficeName = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        var input  = event.target;
        var inputValue  = event.target.value;
        var inputName = event.target.name;
        var errorStatus = inputValue.search(/[^ ", а-яА-Я, a-zA-Z, 0-9]+/g);

        if ( inputName === 'job-office-name' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.job.ON = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.job.ON = true;
            }
        }
    };
    //3
    var validateJobPosition = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        var input  = event.target;
        var inputValue  = event.target.value;
        var inputName = event.target.name;
        var errorStatus = inputValue.search(/[^ а-яА-Я, a-zA-Z, \s-]+/g);

        if ( inputName === 'job-position' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.job.P = false;   //TODO: check name in inputsValidateStatus[ 'name' ] for each validationFunction
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.job.P = true;
            }
        }
    };
    //4
    var validateAddress = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        var input  = event.target;
        var inputValue  = event.target.value;
        var inputName = event.target.name;
        var errorStatus = inputValue.search(/[^ / . а-яА-Я, 0-9, \s-]+/g);

        if ( inputName === 'job-office-address' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.job.OA = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.job.OA = true;
            }
        }

        if ( inputName === 'location-current-street' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.location.CS = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.location.CS = true;
            }
        }
    };
    //5
    var validateBuildingNumberOnly = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        // console.log( 'cbn validation started ...' )
        var input  = event.target;
        var inputValue  = event.target.value;
        var inputName = event.target.name;
        var errorStatus = inputValue.search(/[^ /, 0-9, а-я]+/g);

        // console.log( 'errorStatus = ', errorStatus );
        // console.log( 'input name = ', inputName );

        if ( inputName === 'location-current-building-number' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.location.CBN = false;
                // console.log('CBN = ', inputsValidateStatus.step2.location.CBN);
            } else {                                            // errorStatus === -1 or 'not found bad symbols'
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.location.CBN = true;
                // console.log('CBN = ', inputsValidateStatus.step2.location.CBN);
            }
        }
    };
    //6
    var validateNumberOnly = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        var input  = event.target;
        var inputValue  = event.target.value;
        var inputName = event.target.name;
        var errorStatus = inputValue.search(/[^0-9]+/g);

        if ( inputName === 'location-current-flat-number' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.location.CFN = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.location.CFN = true;
            }
        }

        if ( inputName === 'job-current-experience' ) {
            if ( errorStatus !== -1 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.job.CE = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.job.CE = true;
            }
        }
    };
    //7
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

        if ( inputName === 'job-office-number-phone' ) {
            if ( inputValue.length < 10 || inputValue.length > 10 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.job.ONP = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.job.ONP = true;
            }
        }

        return;
    };
    //8 - check amount and salary
    var validateMoneyValue = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        event.preventDefault();

        var inputValue;
        var input       = event.target;  //inputAmount
        var inputName   = event.target.name;
        // console.log(inputName);

        //Format value
        var inputValueFormated =function ( inputValueDraft ) {
            var arrInputValue         = inputValueDraft.split('').reverse();
            var arrInputValueFormated = arrInputValue.map(function (currentValue, index) {
                if ( ( 3 + index ) % 3 === 0 ) {
                    return currentValue + ' ';
                } else {
                    return currentValue
                }
            });
            return arrInputValueFormated.reverse().join('');
        };


        if (event.key) {
            inputValue = event.target.value + event.key.replace(/[^0-9]+/g, '');
        } else {
            inputValue = event.target.value;
        }

        var inputValueCleanSpace = inputValue.split('').map(function (t) {
            if (t === ' ') {
                return '';
            }
            return t;
        });
        inputValue = inputValueCleanSpace.join('');


        //delete value
        if ( event.keyCode === 8 ) {
            inputValue = inputValue.slice(0, inputValue.length-1);
            $(input).val( inputValueFormated(inputValue) );

        //add value
        } else {
            // $(input).val( inputValueFormated(inputValue) );

                if ( inputName === 'amount' ) {
                    if ( inputValue.length <= 6 && +inputValue <= formOptions.step1.amount.max ) {
                        $(input).val( inputValueFormated(inputValue) );
                        // console.log( 'formOptions.step1.amount.min = ', formOptions.step1.amount.min );
                        // console.log( 'formOptions.step1.amount.max = ', formOptions.step1.amount.max );
                    }
                } else if ( inputName === 'job-salary' ) {
                    if ( inputValue.length <= 6 && +inputValue <= 200000 ) {
                        $(input).val( inputValueFormated(inputValue) );
                    }
                } else {
                    return;
                }
        }

        //Change validate status
        if ( inputName === 'amount' ) {
            if ( +inputValue < formOptions.step1.amount.min || +inputValue > formOptions.step1.amount.max ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step1.amount = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step1.amount = true;
            }
        }

        //Change validate status
        if ( inputName === 'job-salary' ) {
            if ( +inputValue > 200000 || inputValue.length > 6 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.job.S = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.job.S = true;
            }
        }

        return;
    };
    //9 - validate email
    var validateAddressEmail = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        var input  = event.target;
        var inputValue  = event.target.value;
        var inputName = event.target.name;
        var errorStatus = inputValue.search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);

        if ( errorStatus === -1 ) {
            // console.log(errorStatus);

            $(input).addClass('validation-error');
            inputsValidateStatus.step1.addressEmail = false;
        } else {
            $(input).removeClass('validation-error');
            inputsValidateStatus.step1.addressEmail = true;
        }
    };
    //10
    var validatePassportCodes = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        event.preventDefault();

        var inputValue;
        var input       = event.target;  //inputAmount
        var inputName   = event.target.name;
        // console.log(inputName);

        //Format value
        var inputValueFormated =function ( inputValueDraft ) {
            var arrInputValue         = inputValueDraft.split('');
            var arrInputValueFormated = arrInputValue.map(function (currentValue, index) {
                if ( index === 3 && inputName === 'passport-series-and-number' ) {
                    return currentValue + '-';
                } else if ( index === 2 && inputName === 'passport-unit-code' ) {
                    return currentValue + '-';
                } else {
                    return currentValue
                }
            });
            return arrInputValueFormated.join('');
        };


        if (event.key) {
            inputValue = event.target.value + event.key.replace(/[^0-9]+/g, '');
        } else {
            inputValue = event.target.value;
        }

        var inputValueCleanMinus = function () {
            var result = inputValue.split('').map(function (t) {
                if (t === '-') {
                    return '';
                }
                return t;
            });
            return result.join('');
        };

        inputValue = inputValueCleanMinus();


        //delete value
        if ( event.keyCode === 8 ) {
            inputValue = inputValue.slice(0, inputValue.length-1);
            $(input).val( inputValueFormated(inputValue) );
        //add value
        } else {

            if ( inputValue.length <= 10 && inputName === 'passport-series-and-number' ) {
                $(input).val( inputValueFormated(inputValue) );
            } else if ( inputValue.length <= 6 && inputName === 'passport-unit-code' ) {
                $(input).val( inputValueFormated(inputValue) );
            } else {
                return;
            }
        }

        //Change validate status
        if ( inputName === 'passport-series-and-number' ) {
            if ( inputValue.length !== 10 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.passport.SN = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.passport.SN = true;
            }
        }

        //Change validate status
        if ( inputName === 'passport-unit-code' ) {
            if ( inputValue.length !== 6 ) {
                $(input).addClass('validation-error');
                inputsValidateStatus.step2.passport.UC = false;
            } else {
                $(input).removeClass('validation-error');
                inputsValidateStatus.step2.passport.UC = true;
            }
        }

        return;
    };


    //8 - Change checkbox value
    var checkboxChangeValue = function(event) {
        if ( event.keyCode === 9 ) {
            return true;
        }

        var target = $(event.target);
        target.val() === 'on' ? target.val('off') : target.val('on');

        // console.log(target.val());
    };          //TODO: check checkbox to injection data


    //Bind events
    //Step 1
    inputName.on( 'keydown focusout', validateTextRussianOnly );
    inputAddressEmail.on( 'focusout', validateAddressEmail);
    inputAmount.on( 'keydown focusout', validateMoneyValue);
    inputNumberPhone.on( 'keydown focusout', validatePhoneNumber );

    //Step 2
    //passport
    inputPassportSeriesAndNumber.on( 'keydown focusout', validatePassportCodes );
    inputPassportUnitCode.on( 'keydown focusout', validatePassportCodes );
    inputPassportUnitName.on( 'keydown focusout', validateTextRussianOnly );
    inputPassportPlaceBirthday.on( 'keydown focusout', validateTextRussianOnly );
    //location
    inputLocationCurrentRegion.on( 'keydown focusout', validateTextRussianOnly );
    inputLocationCurrentLocality.on( 'keydown focusout', validateTextRussianOnly );
    inputLocationCurrentStreet.on( 'keydown focusout', validateAddress );
    inputLocationCurrentBuildingNumber.on( 'keydown focusout', validateBuildingNumberOnly );
    inputLocationCurrentFlatNumber.on( 'keydown focusout', validateNumberOnly );
    //job
    inputJobOfficeName.on( 'keydown focusout', validateJobOfficeName );
    inputJobOfficeNumberPhone.on( 'keydown focusout', validatePhoneNumber );
    inputJobSalary.on( 'keydown focusout', validateMoneyValue );
    inputJobPosition.on( 'keydown focusout', validateJobPosition );
    inputJobCurrentExperience.on( 'keydown focusout', validateNumberOnly );
    inputJobOfficeAddress.on( 'keydown focusout', validateAddress );




    //Bind events
    checkboxAny.on( 'click', checkboxChangeValue);




    //Open/Close Job data - jobDataContainer
    checkboxJobStatus.on('click', function (event) {
        var checkbox = event.target;
        var jobsStatus = inputsValidateStatus[ 'step2' ].job;

        // console.log( '$(checkbox).val() = ' ,$(checkbox).val() );

        if ( $(checkbox).val() === 'on' ) {
            jobDataContainer.hide();
            jobDataContainer.find('input').val('---');
            for (key in jobsStatus) {
                jobsStatus[key] = true;
            }
        } else {
            jobDataContainer.find('input').val('');  //TODO: dont forget uncomment this
            for (key in jobsStatus) {
                jobsStatus[key] = false;
            }
            jobDataContainer.show();
        }

        console.log(inputsValidateStatus.step2);
    });


    //Set value
    //Set agreement to 'on'
    checkboxAgreement.trigger('click');
    checkboxAgreement.val('on');
    //Set job ststus to 'off'
    // checkboxJobStatus.trigger('click');
    checkboxJobStatus.val('off');
    //checkboxJobStatusHidden
    // checkboxJobStatus.on( 'click', function (event) {
    //     var checkbox = $(event.target);
    //     console.log( $(checkbox).prev('input') );
    // });


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

    //Check empty selects
    selectAny.on( 'focusout', function(event) {
        var inputValue  = $(event.target).prev('input').val();
        var select  = event.target;

        if ( inputValue === '' ) {
            // console.log('inputValue length = ', inputValue.length);
            $(select).addClass('validation-error');
        } else {
            $(select).removeClass('validation-error');
        }
    });



    //Click to submit button
    $(form).submit(function(event) {
        event.preventDefault();

        console.log( formStep );


        var hasEmptyInputs     = false;
        var hasEmptySelects    = false;
        var hasEmptyCheckboxes = false;
        var hasEmptyFields     = false;

        var hasNotValidatedFields = false;

        var statusesPassport = inputsValidateStatus.step2.passport;
        var statusesLocation = inputsValidateStatus.step2.location;
        var statusesJob = inputsValidateStatus.step2.job;


        console.log('try submit');

        inputAny.each(function (index, input) {
            if ( $(input).val() === '' ) {
                $(input).addClass('validation-error');
                hasEmptyInputs = true;
            }
        });

        selectAny.each(function (index, select) {
            if ( $(select).prev('input').val() === '' ) {
                $(select).addClass('validation-error');
                hasEmptySelects = true;
            }
        });

        checkboxAny.each(function (index, checkbox) {
            if ( $(checkbox).val() === 'off' && formStep === 1 ) {
                hasEmptyCheckboxes = true;
            }
        });



        if ( !hasEmptyInputs && !hasEmptySelects && !hasEmptyCheckboxes ) {
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


        if ( formStep === 2 ) {
            //Check inputsValidateStatus for current step
            for ( keyP in statusesPassport ) {
                if ( !statusesPassport[keyP] ) {
                    console.log('find no valid passport field');
                    hasNotValidatedFields = true;
                }
            }
            for ( keyL in statusesLocation ) {
                if ( !statusesLocation[keyL] ) {
                    // console.log( 'keyL = ', keyL );
                    // console.log( '!statusesPassport[keyL] = ', statusesLocation[keyL] );
                    console.log('find no valid location field');
                    hasNotValidatedFields = true;
                }
            }
            for ( keyJ in statusesJob ) {
                if ( !statusesJob[keyJ] ) {
                    console.log('find no valid job field');
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
                var sessionStorageStep1ObjSerialize = JSON.stringify( sessionStorageStep1Obj );
                // console.log('data writed to sS');
                // window.location.replace("/step2.html");
                //JSON.parse('{}');              // {}

                sessionStorage['amr'] = sessionStorageStep1ObjSerialize;    //TODO: remove ['amr'] if user close browser

                window.location.replace("http://domain_name.ru/step2.html");

            }

            if ( formStep === 2 ) {
                var formDataStep1String = JSON.parse(sessionStorage['amr']).form.data.step1;
                var formDataStep2String = $(form).serialize();

                console.log(formDataStep1String);
                console.log(formDataStep2String);
                console.log( $(form) );

                console.log('send form');


                var formDataResult = formDataStep1String + '&' + formDataStep2String;
                console.log(formDataResult);

                initXHR( formDataResult );
            }


        } else {
            // inputAny.each(function (index, input) {
            //     console.log( 'input val = ', $(input).val() );
            // });

            console.log(hasEmptyInputs);
            console.log(hasEmptySelects);
            console.log(hasEmptyCheckboxes);

            console.log('hasNotValidatedFields = ',hasNotValidatedFields);
            console.log(inputsValidateStatus[ 'step' + formStep]);


            console.log('form not valid');
        }
    });

});