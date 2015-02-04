  //MongoDB
Dishes = new Meteor.Collection("dishes");

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
  this.route('home', {path:'/home'})
  this.route('newCostumer', {path: '/registro'});
  }
  );
