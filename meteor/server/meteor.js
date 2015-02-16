
Meteor.methods({
	newFeedthank:function(){
		var id = Feedthanks.insert({});
		return id;
	}
})