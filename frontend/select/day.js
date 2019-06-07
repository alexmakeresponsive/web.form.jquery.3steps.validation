var getDays = function () {
    var result = [];

    for (var i = 1; i <= 31; i++) {
        if ( i === 1 ) {
            result.push({ text: i, value: i, selected: true });
        } else {
            result.push({ text: i, value: i });
        }
    }

    return result;
};

$(document).ready(function() {
    $('select[name="day"]').niceSelect(null, {
        data: getDays(),
        currentText: 'Д.'
    });
});

$(document).ready(function() {
    $('select[name="passport-day"]').niceSelect(null, {
        data: getDays(),
        currentText: 'Д.'
    });
});