$(document).ready(function () {
    var x = -3;
    var start = -3;
    var end = 183;
    var jump = 93;

    // for next slide
    $('.btn-next').click(function () {
    x = (x <= jump) ? (x + jump) : start;
    $('figure').css('left', -x + '%');
    });

    // for prev slide
    $('.btn-prev').click(function () {
    x = (x >= start+jump) ? (x - jump) : end;
    $('figure').css('left', -x + '%');
    });
});