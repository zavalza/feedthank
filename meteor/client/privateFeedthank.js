Template.privateFeedthank.rendered = function(){
	var id =  document.getElementById('feedthankId').value;
	//alert(id);
	var feedthank = Feedthanks.findOne({_id:id});

	if(feedthank.authorId != Meteor.userId())
	{
		Meteor.call('updateGuests', feedthank._id, Meteor.userId());
	}
}