var message="Tu imagen es muy grande, sube una con menos de 5MB"

//File Storage in MongoDb using FS
var imageStore = new FS.Store.S3("images");
Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
      maxSize:1048576*5, //5MB
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    },
    onInvalid: function () {
      if (Meteor.isClient) {
        alert(message);
      } else {
        console.log(message);
      }
    }
});