//File Storage in MongoDb using FS
//var imageStore = new FS.Store.GridFS("images");
var imageStore = new FS.Store.S3("images");

//var imageStore = new FS.Store.FileSystem("images"); not access on Modulus
Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});