  //MongoDB
Feedthanks = new Meteor.Collection("feedthanks");

  Router.map(function() {
  this.route('pitch', {path:'/'});
  this.route('home', {path:'/home'});
  this.route('editFeedthank', {path:'/edit', data:function(){

    var currentFeedthank = Session.get('currentFeedthank');
   return Feedthanks.findOne({_id:currentFeedthank});
    }});

  this.route('publicFeedthank', {path:'/f/:_id', 
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
          'description': 'Something',
          'type':'Website',
          //http://feedthank.com/cfs/files/images/LA6boeHn53Y395tyT/pastel.jpg
          'image': 'http://feedthank.com/background.jpg',
          'image:type':'image/jpeg',
          'image:width':'640',
          'image:height':'442'
          //'image': 'http://feedthank.com/cfs/files/images/'+feedthank.cover
        }
      });
    }

  });

  this.route('privateFeedthank', {path:'/fp/:privateId', data:function(){

   return Feedthanks.findOne({privateId:this.params.privateId});
    }});

}


  );
