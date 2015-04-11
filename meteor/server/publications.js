Meteor.publish('allFeedthanks', function()
  {
    return Feedthanks.find({});
  });

Meteor.publish('publicFeedthank', function(publicId)
{
	return Feedthanks.find({_id:publicId});
});

Meteor.publish('privateFeedthank', function(privateId)
{
	return Feedthanks.find({privateId:privateId});
});

Meteor.publish('allImages', function()
  {
    return Images.find({});
  });

Meteor.publish('allProfiles', function()
{
	return Meteor.users.find({},{'profile':1});
});