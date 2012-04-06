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
