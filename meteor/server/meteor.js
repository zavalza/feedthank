
Meteor.methods({
	newFeedthank:function(userId){
		privateId = Random.id();
		var id = Feedthanks.insert({'privateId':privateId,'authorId':userId, 'reasons':[{}],'meanings':[{}], 'timestamp': new Date(),});
		return id;
	},

	updateTitle:function(id, newTitle, url){
		console.log('update title of '+id+' to '+newTitle);
		Feedthanks.update({_id:id},{$set:{'title':newTitle}});
		var Future = Npm.require('fibers/future');
		var future = new Future();
		HTTP.get("https://graph.facebook.com/?id="+url+"&scrape=true&method=post",
      	function( error, result ){
          if(!error)   {
            console.log('success of fb scrape');
            future.return(true);
          }
          else
          {
            console.log(error.message);
            future.return(false);
          }
           } );
		
		return future.wait();
	},

	updateCover:function(id, imgId, url){
		console.log('cover of feedthank + '+id+' has id: '+imgId);
		Feedthanks.update({_id:id},{$set:{'cover':imgId}});
		var Future = Npm.require('fibers/future');
		var future = new Future();
	   HTTP.get("https://graph.facebook.com/?id="+url+"&scrape=true&method=post",
      function( error, result ){
          if(!error)   {
            console.log('success of fb scrape');
            future.return(true);
          }
          else
          {
            console.log(error.message);
            future.return(false);
          }
           } );
	   return future.wait();
	},

	updateGuests:function(id, userId){
		console.log('updating guests of feedthank '+id+ ' with guest '+userId);
		Feedthanks.update({_id:id}, {$addToSet: { 'guests': userId}});
	},

	addReason:function(id){
		console.log('adding reason to feedthank '+id);
		Feedthanks.update({_id:id},{$push:{'reasons':{}}});
	},

	addMeaning:function(id){
		console.log('adding meaning to feedthank '+id);
		Feedthanks.update({_id:id},{$push:{'meanings':{}}});
	},

	updateReasons:function(id, arrayOfReasons){
		console.log('updating reasons of feedthank '+id);
		Feedthanks.update({_id:id},{$set:{'reasons':arrayOfReasons}})
	},

	updateMeanings:function(id, arrayOfMeanings){
		console.log('updating meanings of feedthank '+id);
		Feedthanks.update({_id:id},{$set:{'meanings':arrayOfMeanings}})
	},

	updateWhen:function(id, newWhen){
		console.log('update when of '+id +' to '+newWhen);
		Feedthanks.update({_id:id},{$set:{'when':newWhen}});
	},

	deleteCover:function(id, imgId){
		console.log('Deleting cover '+ imgId + ' from feedthank '+id);
		Feedthanks.update({_id:id},{$set:{'cover':null}});
		Images.remove({_id: imgId});
	},

	publishFeedthank:function(id){
		console.log('making public feedthank '+id);
		Feedthanks.update({_id:id},{$set:{'isPublic':true}})
	}
	
})

Accounts.onCreateUser(function(options, user){
    var name, email, fbLink, fbPicture;
    if(user.services.facebook)
    {
      console.log(user.services.facebook);
      name = user.services.facebook.first_name+" "+user.services.facebook.last_name;
      email = user.services.facebook.email;
      fbLink = user.services.facebook.link;
      fbPicture = "http://graph.facebook.com/v2.0/" + user.services.facebook.id + "/picture/?width=100&height=100"; //graph request for picture
      var profile ={
                      url:null,
                      name:name,
                      email:email,
                      picture:fbPicture, //url of picture
                      facebook_url:fbLink,
                    }
   
    }
    user.profile = profile;
    return user;
  });