$(function(){
  $('form').submit(function(){

    var $form=$(this);
    $.ajax({
      type:"POST",
      url:$form.attr('action'),
      data:$form.serialize()
    }).done(function(){
      console.log('you did it');
    }).fail(function(xhr,status){
      console.log('come on!',xhr.status,xhr.statusText);
    });

    return false;
  });
});

$(document).on('click','[data-at]',function(){
  _gat._getTrackerByName()._trackEvent('time-delay','internal');
  console.log('will track');
  setTimeout('document.location = "' + $(this).attr('href') + '"', 50);
  return false;
});