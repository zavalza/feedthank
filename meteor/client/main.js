
/*Accounts.ui.config({
  requestPermissions: {
    facebook: ['user_likes']
  }
});*/

Template.pitch.rendered = function(){

    $('#homeCarousel').carousel({
        interval:6000,
        pause: "false"
    });
}


  Template.pitch.events({

	'click .newFeedthank' : function(evt, tmpl){

		if(Meteor.user())
		{

		var id = Meteor.call('newFeedthank', Meteor.userId(), function(err, result){
			Session.set('currentFeedthank', result);
			Router.go('editFeedthank');
		})
		}
		else
		{
			Meteor.loginWithFacebook({},  function (err) {
          		if (!err)
          		{
          			var id = Meteor.call('newFeedthank', Meteor.userId(), function(err, result){
					Session.set('currentFeedthank', result);
					Router.go('editFeedthank');
          			});
          		}

     			});
		}


	},

  });

