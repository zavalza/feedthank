  Router.map(function() {
  this.route('pitch', {path:'/'});
  this.route('home', {path:'/home'});
  this.route('editFeedthank', {path:'/edit', data:function(){

    var currentFeedthank = Session.get('currentFeedthank');
   return Feedthanks.findOne({_id:currentFeedthank});
    }});

  this.route('feedthank', {path:'/f/:_id', 
    waitOn : function () {
        return Meteor.subscribe('publicFeedthank', this.params._id);
    },
    data:function(){

   return Feedthanks.findOne({_id:this.params._id});
    },
    onAfterAction: function() {
      var feedthank, image, imageUrl;

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

        var titleToShow =  feedthank.title;
      if(titleToShow == null)
        titleToShow = "Mi platillo para ti";

      SEO.set({
        title: titleToShow,
        meta: {
          'description': 'Something'
        },
        og: {
          'title': titleToShow,
          'description': 'Las personas pueden expresar muchas cosas cocinando, da click en la imagen para ver mi historia',
          'type':'article',
          'image': imageUrl,
          'image:type':'image/jpeg',
          'image:width':'630',  //these fields are necessary for og sharing to work first time
          'image:height':'630'
        }
      });
    }

  });

  this.route('privateFeedthank', {path:'/fp/:privateId',
    waitOn : function () {
        return Meteor.subscribe('privateFeedthank', this.params.privateId);
    },
   data:function(){

   return Feedthanks.findOne({privateId:this.params.privateId});
    },
        onAfterAction: function() {
      var feedthank, image, imageUrl;

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

      var titleToShow =  feedthank.title;
      if(titleToShow == null)
        titleToShow = "Mi platillo para ti";

      SEO.set({
        title: titleToShow,
        meta: {
          'description': 'Something'
        },
        og: {
          'title': titleToShow,
          'description': 'Eres una persona especial y por eso te he cocinado algo, da click en la imagen para descubrirlo',
          'type':'article',
          'image': imageUrl,
          'image:type':'image/jpeg',
          'image:width':'630', //these fields are necessary for og sharing to work first time
          'image:height':'630'
        }
      });
    }


  });

}


  );