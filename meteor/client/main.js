Meteor.startup(function () {
//Redirect www to ROOT URL in meteor
if(window.location.hostname.search('www') != -1)
  window.location.assign("http://feedthank.com");
//Meteor.subscribe("allDishes");
Session.set('meanings', ['']);
Session.set('arrayOfImgIds',[]);
Session.set('arrayOfMeaningImg',[]);
Session.set('currentFeedthank', null);
Session.set('coverId', null);
});

/*Accounts.ui.config({
  requestPermissions: {
    facebook: ['user_likes']
  }
});*/

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

