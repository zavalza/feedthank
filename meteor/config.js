  //MongoDB
Feedthanks = new Meteor.Collection("feedthanks");

//File Storage in MongoDb using FS
var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});

  Router.map(function() {
  this.route('pitch', {path:'/'});
  this.route('home', {path:'/home'});
  this.route('editFeedthank', {path:'/edit', data:function(){

    var currentFeedthank = Session.get('currentFeedthank');
   return Feedthanks.findOne({_id:currentFeedthank});
    }});

  this.route('publicFeedthank', {path:'/feedthank/:_id', 
    data:function(){

   return Feedthanks.findOne({_id:this.params._id});
    },
    onAfterAction: function() {
      var feedthank;
      // The SEO object is only available on the client.
      // Return if you define your routes on the server, too.
      if (!Meteor.isClient) {
        return;
      }
      feedthank = this.data();
      SEO.set({
        title: feedthank.title,
        meta: {
          'description': 'Something'
        },
        og: {
          'title': feedthank.title,
          'description': 'Something'
        }
      });
    }

  });

  this.route('privateFeedthank', {path:'/feedthank/p/:privateId', data:function(){

   return Feedthanks.findOne({privateId:this.params.privateId});
    }});

}


  );
