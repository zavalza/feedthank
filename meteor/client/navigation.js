Template.navigation.events ({
	'click .newFeedthank' : function(evt, tmpl){
		var id = Meteor.call('newFeedthank', function(err, result){
			Session.set('currentFeedthank', result);
			Router.go('editFeedthank');
		})

	}
})