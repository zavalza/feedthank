
Meteor.methods({
	newFeedthank:function(){
		var id = Feedthanks.insert({'reasons':[{}],'meanings':[{}]});
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