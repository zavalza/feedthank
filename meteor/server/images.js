//File Storage in MongoDb using FS
//var imageStore = new FS.Store.GridFS("images");
var imageStore = new FS.Store.S3("images", {
  region: "us-west-2", //optional in most cases
  accessKeyId: "AKIAIW67GTLWHO7VR57A", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  bucket: "feedthank", //required
});

//var imageStore = new FS.Store.FileSystem("images"); not access on Modulus
Images = new FS.Collection("images", {
  stores: [imageStore],
  filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});