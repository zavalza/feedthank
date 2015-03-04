Meteor.publish('allFeedthanks', function()
  {
    return Feedthanks.find({});
  });

Meteor.publish('allImages', function()
  {
    return Images.find({});
  });