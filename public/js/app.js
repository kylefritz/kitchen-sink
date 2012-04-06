$(function(){
  $('form').submit(function(){

    var $form=$(this);
    $.ajax({
      type:"POST",
      url:$form.attr('action'),
      data:$form.serialize()
    }).done(function(){
      console.log('you did it');
    }).fail(function(){
      console.log('come on!');
    });

    return false;
  });
});
