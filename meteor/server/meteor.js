
Meteor.methods({
	newFeedthank:function(){
		var id = Feedthanks.insert({});
		return id;
	},

	updateTitle:function(id, newTitle){
		console.log('update title of '+id+' to '+newTitle);
		Feedthanks.update({_id:id},{$set:{'title':newTitle}});
	},

	updateCover:function(id, imgId){
		console.log('cover of feedthank + '+id+' has id: '+imgId);
		Feedthanks.update({_id:id},{$set:{'cover':imgId}});
	},

	updateReasons:function(id, arrayOfReasons){
		console.log('updating reasons of feedthank '+id);
		Feedthanks.update({_id:id},{$set:{'reasons':arrayOfReasons}})
	},

	updateWhen:function(id, newWhen){
		console.log('update when of '+id +' to '+newWhen);
		Feedthanks.update({_id:id},{$set:{'when':newWhen}});
	},

	deleteCover:function(id, imgId){
		console.log('Deleting cover '+ imgId + ' from feedthank '+id);
		Feedthanks.update({_id:id},{$set:{'cover':null}});
		Images.remove({_id: imgId});
	}
	
})