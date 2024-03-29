//transform functions for images
var createThumb = function(fileObj, readStream, writeStream) {

  gm(readStream, fileObj.name()).size({bufferStream: true}, FS.Utility.safeCallback(function (err, size) {
      if (err) {
        // handle the error
      } else {
         console.log(size.width + " ," + size.height);
      }
    }));

  
  //enlarge if it less than 200x200px

  //keep  1.91:1 aspect ratio
  //gm(readStream, fileObj.name()).resize('191', '630 !').stream().pipe(writeStream);
  // force image to a 1200 x 630 image just if they are larger than that
  //probably we need to store two images, one with dimensions of cover and other with send squere dimensions
  //force square dimensions in order to work with send
  gm(readStream, fileObj.name()).resize('630', '630 !').stream().pipe(writeStream);
  
};

var message="Tu imagen es muy grande, sube una con menos de 5MB"


//File Storage in MongoDb using FS
var imageStore = new FS.Store.S3("images", {
  region: "us-west-2", //optional in most cases
  accessKeyId: "AKIAIW67GTLWHO7VR57A", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  transformWrite: createThumb,
  bucket: "feedthank", //required
});

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