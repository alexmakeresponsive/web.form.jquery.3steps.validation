$(document).ready(function() {
    $('select[name="story"]').niceSelect(null, {
        data:[
            { text: 'нет открытых просрочек', value: 'false', selected: true },
            { text: 'есть открытые просрочки', value: 'true' }
        ],
        currentText: 'выберите просрочку'
    });
});