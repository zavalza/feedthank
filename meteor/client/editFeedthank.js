Template.editFeedthank.rendered = function()
{

  //hide edite from other users? make isPublic:false

  Session.set('coverId', null);
  Session.set('waiting', false);
   Session.set('reasonImgId', null);


}

Template.reasonInput.rendered = function()
{
    //Show all placeholders
  $("textarea").each(function(){
        $(this).focus();
        $(this).blur();
    });
}


Template.editFeedthank.events({

  'change #title' : function(evt, tmpl){
    var newTitle = document.getElementById('title').value;
     var url = document.getElementById('sendFb').value;
        
      Meteor.call('updateTitle', this._id, newTitle, url);
  },
  
  'click .sendFeedthank': function(evt, tmpl){
    //alert('click');
    var feedthankId = document.getElementById('title').name;
    var reasonText = document.getElementById('reasonText').value;
    //console.log(feedthankId);
    var url = document.getElementById('sendFb').value;
    var imgId = Session.get('reasonImgId');

    if((reasonText!="") || (imgId != null))
    {
    Meteor.call('updateCover', feedthankId, imgId, url);
    Meteor.call('updateReasons', feedthankId, imgId, reasonText);
    Session.set('reasonImgId', null);
    document.getElementById('reasonText').value = "";
    }
    
    Router.go('sendFeedthank');
    //alert(Session.get('sendFeedthank'));
  },

    'click .publish': function(evt, tmpl)
    {
      //check for fields??

      //make public the feedthank
      //var feedthankId = document.getElementById('cover').name;
      //Meteor.call('publishFeedthank', feedthankId);

      //public url

      //private url
    
    /*FB.ui({
  method: 'send',
  display:'popup',
  link: 'http://www.nytimes.com/2011/06/15/arts/people-argue-just-to-win-scholars-assert.html',
});Pop up works ok in all browsers, but not in mobile*/


      //Show new feedthank
      //Router.go('feedthank')
      //Router.go('home');
    }

  });


Template.reasonInput.events({
  'click .reasonImgInput' : function(evt, tmpl){
    evt.preventDefault();
 var imgFile = tmpl.find('.reasonImg');
 imgFile.click();
},

  'click .saveReason':function(evt, tmpl){
    //alert('reasonImg');
    var feedthankId = document.getElementById('title').name;
    var reasonText = document.getElementById('reasonText').value;
    //console.log(feedthankId);
    var url = document.getElementById('sendFb').value;
    var imgId = Session.get('reasonImgId');
    Meteor.call('updateCover', feedthankId, imgId, url);
    Meteor.call('updateReasons', feedthankId, imgId, reasonText);
    Session.set('reasonImgId', null);
    document.getElementById('reasonText').value = "";
  },

  'change .reasonImg':function(evt, tmpl){
    //Session.set('waiting', true);
     FS.Utility.eachFile(evt, function(file) {
        im = Images.insert(file, function (err, fileObj) {});
        Session.set('reasonImgId', im._id)
        //console.log(im._id)
      });
  },

})



    Template.editFeedthank.helpers ({

        image: function(id)
        {
            //alert(typeof (ids)) string
            return Images.find({_id:id})
          
        },

        rootURL: function()
        {
          //alert (document.URL)
          var root =  Meteor.absoluteUrl();
          //root = root.replace('http://', 'www.');
          //alert (root);
          return root.slice(0, root.length-1);
        },

        sendFeedthank: function()
        {
          return Session.get('sendFeedthank');
        }
    });

      Template.reasonInput.helpers({
      image: function(id)
        {
            //alert(typeof (ids)) string
            return Images.find({_id:id})

        },

      waiting: function(){
        return Session.get('waiting');
      },

      reasonImgId: function(){
        return Session.get('reasonImgId');
      }
    })


    Template.reason.helpers({
      imageUrl: function(imageId)
        {
          
            //alert(typeof (ids)) string
            var image = Images.findOne({_id:imageId});
            //console.log(image)
            if(image)
              return image.url();
            else
              return "feedthank.jpg"
          
        },
    })

