Template.navigation.events ({
	'click .newFeedthank' : function(evt, tmpl){
		var id = Meteor.call('newFeedthank', function(err, result){
			Session.set('currentFeedthank', result);
			Router.go('editFeedthank');
		})

	},

	'click .tryLogout' : function(evt, tmpl)
	{
	Meteor.logout(function(err){
            if (err)
            {
              //To do if logout was not successfull
            }
            else{
                Router.go('loginForm');
              }
            });
        return false
      },
})