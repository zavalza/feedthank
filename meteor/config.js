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
      var feedthank, image, imageUrl;
      // The SEO object is only available on the client.
      // Return if you define your routes on the server, too.
      if (!Meteor.isClient) {
        return;
      }
      feedthank = this.data();

      image = Images.findOne({
          _id:feedthank.cover
        })
      if(image == null)
      {
        imageUrl = "http://feedthank.com/background.jpg"; 
      }
      else
      {
        imageUrl = "https://s3-us-west-2.amazonaws.com/feedthank/images/"+image._id+"-"+image.original.name;
      }

      SEO.set({
        title: feedthank.title,
        meta: {
          'description': 'Something'
        },
        og: {
          'title': feedthank.title,
          'description': 'Las personas pueden expresar muchas cosas cocinando, da click en la imagen para ver mi historia',
          'type':'article',
          'image': imageUrl,
          'image:type':'image/jpeg',
          'image:width':'640',
          'image:height':'442'
        }
      });
    }

  });

  this.route('privateFeedthank', {path:'/fp/:privateId',
   data:function(){

   return Feedthanks.findOne({privateId:this.params.privateId});
    },
        onAfterAction: function() {
      var feedthank, image, imageUrl;
      // The SEO object is only available on the client.
      // Return if you define your routes on the server, too.
      if (!Meteor.isClient) {
        return;
      }
      feedthank = this.data();

      image = Images.findOne({
          _id:feedthank.cover
        })
      if(image == null)
      {
        imageUrl = "http://feedthank.com/background.jpg"; 
      }
      else
      {
        imageUrl = "https://s3-us-west-2.amazonaws.com/feedthank/images/"+image._id+"-"+image.original.name;
      }

      SEO.set({
        title: feedthank.title,
        meta: {
          'description': 'Something'
        },
        og: {
          'title': feedthank.title,
          'description': 'Eres una persona especial y por eso te he cocinado algo, da click en la imagen para descubrirlo',
          'type':'article',
          'image': imageUrl,
          'image:type':'image/jpeg',
          'image:width':'640',
          'image:height':'442'
        }
      });
    }


  });

}


  );
