var getYears = function () {

    var currentDay  = new Date();
    var currentYear = currentDay.getFullYear();

    var ageMax = 80;
    var ageMin = 18;

    var yearBegin = currentYear - ageMax;
    var yearEnd   = currentYear - ageMin;

    var result = [];

    for (var i = yearBegin; i <= yearEnd; i++) {
        if ( i === yearEnd ) {
            result.push({ text: i, value: i, selected: true });
        } else {
            result.push({ text: i, value: i });
        }
    }

    // console.log(result);
    return result.reverse();
};

$(document).ready(function() {
    $('select[name="year"]').niceSelect(null, {
        data: getYears(),
        currentText: 'Г.'
    });
});


var getYearsPasport = function () {

    var currentDay  = new Date();
    var currentYear = currentDay.getFullYear();

    var ageMax = 80;
    var ageMin = 18;

    var yearBegin = currentYear - ageMax;
    var yearEnd   = currentYear;

    var result = [];

    for (var i = yearBegin; i <= yearEnd; i++) {
        if ( i === yearEnd ) {
            result.push({ text: i, value: i, selected: true });
        } else {
            result.push({ text: i, value: i });
        }
    }

    // console.log(result);
    return result.reverse();
};

$(document).ready(function() {
    $('select[name="passport-year"]').niceSelect(null, {
        data: getYearsPasport(),
        currentText: 'Г.'
    });
});