$('#top-header, #about').on('click', function(e){
    e.preventDefault();
    var target= $(this).get(0).id == 'top-header' ? $('#about') : $('#top-header');
    $('html, body').stop().animate({
       scrollTop: target.offset().top
    }, 1000);
});
