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
$(document).on('click','[data-remote-send]',function(){
  var $this=$(this);
  $.ajax({
    method:$this.data('remote-send'),
    url:$this.attr('href')
  })
  return false;
});


var pusher = new Pusher(PUSHER_KEY);
var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
  alert(data);
});