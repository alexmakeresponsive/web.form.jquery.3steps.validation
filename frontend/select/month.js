var getMonths = function () {
    // var src = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
    var src = [ 'Янв.', 'Фев.', 'Мар.', 'Апр.', 'Май', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Нояб.', 'Дек.' ];

    var i = 0;
    var result = src.map(function (t) {
        ++i;
        if (i === 1) {
            return { text: t, value: i, selected: true };
        }
        return { text: t, value: i };
    });

    return result;
};


$(document).ready(function() {
    $('select[name="month"]').niceSelect(null, {
        data: getMonths(),
        currentText: 'М.'
    });
});

$(document).ready(function() {
    $('select[name="passport-month"]').niceSelect(null, {
        data: getMonths(),
        currentText: 'М.'
    });
});