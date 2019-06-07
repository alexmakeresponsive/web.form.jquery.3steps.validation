<?php

header("Access-Control-Allow-Origin: http://domain_name.ru");
print 3434;

function stringCleaner( $name, $value ) {
    $value = $value . '';

    // !#$%&'*+-=?^_`{|}~@.[].
    $filter_SANITIZE_EMAIL_arr = array( "'", "*", "=", ".", "]", "}" );

    switch ($name) {
        case 'validation:NumberWithSpaces':
            return preg_replace( '/[^ 0-9]+/', '', $value );
            break;

        case 'validation:TextEnglishLowCaseOnly':
            return preg_replace( '/[^a-z]+/u', '', $value );
            break;

        case 'validation:TextRussianOnly':
            return preg_replace( '/[^ . а-яА-Я \s-]+/u', '', $value );
            break;

        case 'validation:Number':
            return preg_replace( '/[^0-9]+/', '', $value );
            break;

        case 'validation:NumberPhone':
            return filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, array('flags'=> FILTER_FLAG_ALLOW_FRACTION));
            break;

        case 'address-e-mail':
            return filter_var($value, FILTER_SANITIZE_EMAIL, array());
            break;

        case 'validation:NumberPassport':
            return preg_replace( '/[^0-9, \s-]+/', '', $value );
            break;

        case 'validation:BuildingNumberOnly':
            return preg_replace( '/[^ \/ 0-9 а-яА-Я]+/u', '', $value );
            break;

        case 'validation:JobOfficeName':
            return preg_replace( '/[^ ", а-яА-Я, a-zA-Z, 0-9]+/u', '', $value );
            break;

        case 'validation:JobPosition':
            return preg_replace( '/[^ а-яА-Я, a-zA-Z, \s-]+/u', '', $value );
            break;

        case 'validation:Address':
            return preg_replace( '/[^ \/ . а-яА-Я 0-9 \s-]+/u', '', $value );
            break;
    }

    return '';
}


function sendDataToServer($url, $data) {
    // use key 'http' even if you send the request to https://...
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'GET',
            'content' => json_encode($data)
        )
    );
    $context  = stream_context_create($options);
    return json_decode(file_get_contents($url, false, $context), true);
}


if (!function_exists('http_response_code')) {
    function http_response_code($newcode = NULL) {
        static $code = 200;
        if ($newcode !== NULL) {
            header('X-PHP-Response-Code: ' . $newcode, true, $newcode);
            if (!headers_sent()) {
                $code = $newcode;
            }
        }
        return $code;
    }
}


// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //Prepare fields
    //Step 1
    //1
    $fieldAmount  = stringCleaner('validation:NumberWithSpaces',  $_POST['amount']);
    //2
    $fieldStory   = stringCleaner('validation:TextRussianOnly',  $_POST['story']);
    //3
    $fieldRegion  = stringCleaner('validation:TextRussianOnly',  $_POST['region']);
    //4
    $fieldCity    = stringCleaner('validation:TextRussianOnly',  $_POST['city']);
    //5
    $fieldName    = stringCleaner('validation:TextRussianOnly',  $_POST['name']);
    // dob
    //6
    $fieldDay      = stringCleaner('validation:Number',  $_POST['day']);
    //7
    $fieldMonth    = stringCleaner('validation:TextRussianOnly',  $_POST['month']);
    //8
    $fieldYear     = stringCleaner('validation:Number',  $_POST['year']);
    //contacts
    //9
    $fieldNumberPhone     = stringCleaner('validation:NumberPhone',  $_POST['number-phone']);
    //10
    $fieldAddressEmail    = stringCleaner('address-e-mail',  $_POST['address-e-mail']);


    //Step 2
    //passport
    $fieldPassportSN    = stringCleaner('validation:NumberPassport',  $_POST['passport-series-and-number']);
    $fieldPassportUC    = stringCleaner('validation:NumberPassport',  $_POST['passport-unit-code']);
    $fieldPassportUN    = stringCleaner('validation:TextRussianOnly',  $_POST['passport-unit-name']);
    $fieldPassportDay      = stringCleaner('validation:Number',  $_POST['passport-day']);
    $fieldPassportMonth    = stringCleaner('validation:TextRussianOnly',  $_POST['passport-month']);
    $fieldPassportYear     = stringCleaner('validation:Number',  $_POST['passport-year']);
    $fieldPassportPB    = stringCleaner('validation:TextRussianOnly',  $_POST['passport-place-birthday']);
    //location
    $fieldLocationCR    = stringCleaner('validation:TextRussianOnly',  $_POST['location-current-region']);
    $fieldLocationCL    = stringCleaner('validation:TextRussianOnly',  $_POST['location-current-locality']);
    $fieldLocationCS    = stringCleaner('validation:Address',  $_POST['location-current-street']);

    $fieldLocationCBN    = stringCleaner('validation:BuildingNumberOnly',  $_POST['location-current-building-number']);

    $fieldLocationCFN    = stringCleaner('validation:Number',  $_POST['location-current-flat-number']);
    //job
    $fieldJobStatus    = stringCleaner('validation:TextEnglishLowCaseOnly',  $_POST['job-status']);

    $fieldJobON    = stringCleaner('validation:JobOfficeName',  $_POST['job-office-name']);
    $fieldJobP    = stringCleaner('validation:JobPosition',  $_POST['job-position']);

    $fieldJobOA    = stringCleaner('validation:Address',  $_POST['job-office-address']);

    $fieldJobONP    = stringCleaner('validation:NumberPhone',  $_POST['job-office-number-phone']);
    $fieldJobS    = stringCleaner('validation:NumberWithSpaces',  $_POST['job-salary']);
    $fieldJobCE    = stringCleaner('validation:Number',  $_POST['job-current-experience']);


    $url = 'http://';

    $data = array('name' => $fieldName, 'email' => $fieldAddressEmail, 'phone' =>$fieldNumberPhone,
        'amount' => intval($fieldAmount), 'story' => $fieldStory, 'region' => $fieldRegion, 'city' => $fieldCity,
        'birth_date' => '12-12-2017', 'passport_series_and_number' => $fieldPassportSN, 'passport_unit_code' => $fieldPassportUC,
        'passport_unit_name' => $fieldPassportUN, 'passport_place_birthday' => $fieldPassportPB,
        'location_current_region' => $fieldLocationCR, 'location_current_location' => $fieldLocationCL,
        'location_current_street' => $fieldLocationCS,
        'location_current_building_number' => $fieldLocationCBN, 'location_current_flat_number' => $fieldLocationCFN,
        'job_status' => $fieldJobStatus, 'job_office_name' => $fieldJobON, 'job_office_position' => $fieldJobP,
        'job_office_address' => $fieldJobOA, 'job_office_number_phone' => $fieldJobONP, 'job_salary' => $fieldJobS,
        'job_current_experience' => $fieldJobCE
    );

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);

    file_get_contents('http://');







    //Build mail

    $recipient = "";

    $subjectBody = "Новая заявка c сайта domain_name.ru";
    $subject = "=?utf-8?B?".base64_encode( $subjectBody )."?=";

//    $mallBody .= " \n\n";
//    $mallBody .= "Имя: $name\n";
//    $mallBody .= "Телефон: $email\n";
//    $mallBody .= " \n";

    $mallBody  = '';
    $mallBody .= '<html><body>';
    $mallBody .= '<div style="font-size: 16px;">';
    $mailBody .= '<h2>' . 'Новая заявка с сайта domain_name.ru' . '</h2>';
    $mallBody .= '<h3>' . 'Форма( шаг 1 )' . '</h3>';

    $mallBody .= '<table rules="all" style="border-color: #666; width: 100%;" cellpadding="10">';
    $mallBody .= '</tbody>';

    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Сумма:</td><td>' . $fieldAmount . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Кредитная история:</td><td>' . $fieldStory . '</td></tr>';
    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Регион:</td><td>' . $fieldRegion . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Город:</td><td>' . $fieldCity . '</td></tr>';
    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Ф.И.О.:</td><td>' . $fieldName . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Дата рождения:</td><td>' . $fieldDay . ' ' . $fieldMonth . ' ' . $fieldYear . '</td></tr>';
    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Номер телефона:</td><td>' . $fieldNumberPhone . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">E-mail:</td><td>' . $fieldAddressEmail . '</td></tr>';

    $mallBody .= '</tbody>';
    $mallBody .= '</table>';


    $mallBody .= '<h3>' . 'Форма( шаг 2 )' . '</h3>';


    //passport
    $mallBody .= '<h4>' . 'Паспортные данные' . '</h4>';

    $mallBody .= '<table rules="all" style="border-color: #666; width: 100%;" cellpadding="10">';
    $mallBody .= '</tbody>';

    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Серия и номер:</td><td>' . $fieldPassportSN . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Код подразделения:</td><td>' . $fieldPassportUC . '</td></tr>';
    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Кем выдан:</td><td>' . $fieldPassportUN . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Дата выдачи:</td><td>' . $fieldPassportDay . ' ' . $fieldPassportMonth . ' ' . $fieldPassportYear . '</td></tr>';
    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Место рождения (как в паспорте):</td><td>' . $fieldPassportPB . '</td></tr>';

    $mallBody .= '</tbody>';
    $mallBody .= '</table>';


    //location
    $mallBody .= '<h4>' . 'Адрес фактического проживания' . '</h4>';

    $mallBody .= '<table rules="all" style="border-color: #666; width: 100%;" cellpadding="10">';
    $mallBody .= '</tbody>';

    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Регион:</td><td>' . $fieldLocationCR . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Населенный пункт:</td><td>' . $fieldLocationCL . '</td></tr>';
    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Улица:</td><td>' . $fieldLocationCS . '</td></tr>';
    $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Дом:</td><td>' . $fieldLocationCBN . '</td></tr>';
    $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Квартира:</td><td>' . $fieldLocationCFN . '</td></tr>';

    $mallBody .= '</tbody>';
    $mallBody .= '</table>';


    //job
    $mallBody .= '<h4>' . 'Данные о месте работы' . '</h4>';
    if ( $fieldJobStatus === 'off' ) {
        $mallBody .= '<table rules="all" style="border-color: #666; width: 100%;" cellpadding="10">';
        $mallBody .= '</tbody>';

//        $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Рабочий статус:</td><td>' . 'Есть место работы' . '</td></tr>';
        $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Название организации:</td><td>' . $fieldJobON . '</td></tr>';
        $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Должность:</td><td>' . $fieldJobP . '</td></tr>';
        $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Адрес организации:</td><td>' . $fieldJobOA . '</td></tr>';
        $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Телефон организации:</td><td>' . $fieldJobONP . '</td></tr>';
        $mallBody .= '<tr style="background: #fff;"><td style="width: 50%;">Сумма ежемесячного дохода:</td><td>' . $fieldJobS . '</td></tr>';
        $mallBody .= '<tr style="background: #eee;"><td style="width: 50%;">Стаж не текущем месте работы:</td><td>' . $fieldJobCE . '</td></tr>';

        $mallBody .= '</tbody>';
        $mallBody .= '</table>';
    } else {
        $mallBody .= 'Рабочий статус: <b>' .  'Нет места работы' . '</b>';
    }
    $mallBody .= '</div>';
    $mallBody .= '</body></html>';




    $from = 'email-provider@domain_name.ru';
    $email_headers  = "From: $from\r\n";
    $email_headers .= "Reply-to: $from\r\n";
    $email_headers .= "Content-type: text/html; charset=utf-8\r\n";

    // Send the email.
    if ( mail($recipient, $subject, $mallBody, $email_headers) ) {

        http_response_code(403);

    } else {
        http_response_code(500);
        exit;
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    exit;
}
