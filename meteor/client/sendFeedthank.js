Template.sendFeedthank.rendered = function()
{

  //datimepicker package
  var picker = $('.date').datetimepicker({ sideBySide: false});
  
  picker.on('change', function(e){
    var feedthankId = document.getElementById('cover').name;
       Meteor.call('updateWhen', feedthankId, document.getElementById('when').value )
    });

  //fb send button
  try {
        FB.XFBML.parse();
    }catch(e) {}   

  //fb send callback
  /*var message_send_callback = function(url) {
  console.log("message_send_callback");
  console.log(url);
  };  
  FB.Event.subscribe('message.send', message_send_callback);*/

}


Template.sendFeedthank.events({

'click .backToEdit': function(evt, tmpl){
    //alert('click');
    Router.go('editFeedthank') 

  },

 'change #place': function(evt, tmpl){
 	var feedthankId = document.getElementById('cover').name;
 	var place = document.getElementById('place').value;
 	Meteor.call('updateWhere', feedthankId, place)
 }

});

Template.sendFeedthank.helpers({
	  rootURL: function()
        {
          //alert (document.URL)
          var root =  Meteor.absoluteUrl();
          //root = root.replace('http://', 'www.');
          //alert (root);
          return root.slice(0, root.length-1);
        },
})
