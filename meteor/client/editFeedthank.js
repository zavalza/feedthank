Template.editFeedthank.rendered = function()
{

  //hide edite from other users? make isPublic:false

  //Reset images to show
  Session.set('arrayOfImgIds',[]);
  Session.set('arrayOfMeaningImg',[]);
  Session.set('coverId', null);
  Session.set('sendFeedthank', false);
  Session.set('waiting', false);


  //datimepicker package
  var picker = $('.date').datetimepicker({ sideBySide: false});
  
  picker.on('change', function(e){
    var feedthankId = document.getElementById('cover').name;
       Meteor.call('updateWhen', feedthankId, document.getElementById('when').value )
    });

  //fb send callback
  /*var message_send_callback = function(url) {
  console.log("message_send_callback");
  console.log(url);
  };  
  FB.Event.subscribe('message.send', message_send_callback);*/

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

 'change #cover' : function(evt, tmpl) {
    document.getElementById('waitCover').style.visibility='visible';
    document.getElementById('waitCover').style.height='100px';
    var feedthankId = document.getElementById('cover').name;
    if(Session.get('coverId')) //has already uploaded a image, delete it
    {
      Meteor.call('deleteCover',feedthankId, Session.get('coverId'));
    }
    //upload new Image   
    var error = false;
    FS.Utility.eachFile(evt, function(file) {
      im = Images.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
        if(err){
          error = true;
        }
      });
      if(!error)
      {

        //alert(EJSON.stringify(im));
        //Show it
        Session.set('coverId', im._id);        //update db
        var url = document.getElementById('sendFb').value;
        
        Meteor.call('updateCover', feedthankId, im._id, url);
      

      }   
    });
  },


  'change #title' : function(evt, tmpl){
    var newTitle = document.getElementById('title').value;
     var url = document.getElementById('sendFb').value;
        
      Meteor.call('updateTitle', this._id, newTitle, url);
  },

  'load #title': function(evt, tmpl){
     FB.XFBML.parse();
   },

   'change #when': function(evt, tmpl){
    alert('change')
   },
  
  'click .sendFeedthank': function(evt, tmpl){
    //alert('click');
    Session.set('sendFeedthank', true);
    var picker= document.getElementById('picker');
     picker.style.position="static";
    picker.style.visibility = 'visible';
    //alert(Session.get('sendFeedthank'));
  },

  'click .backToEdit': function(evt, tmpl){
    //alert('click');
    Session.set('sendFeedthank', false);
    var picker= document.getElementById('picker');
    picker.style.position="absolute";
    picker.style.left= "0px";
    picker.style.top= "0px";
    picker.style.visibility = 'hidden';
    //alert(Session.get('sendFeedthank'));
  },


  'click .newReason' : function(evt, tmpl){
    var feedthankId = document.getElementById('cover').name;
    Meteor.call('addReason', feedthankId);
    var arrayOfImgIds = Session.get('arrayOfImgIds');
    arrayOfImgIds.push(null);
    Session.set('arrayOfImgIds', arrayOfImgIds);
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
  'click #reasonImgInput' : function(evt, tmpl){
    evt.preventDefault();
 var imgFile = tmpl.find('.reasonImg');
 imgFile.click();
},

  'change .reasonImg':function(evt, tmpl){
    //alert('reasonImg');
     Session.set('waiting', true);
    var feedthankId = document.getElementById('cover').name;
    var images = document.getElementsByName('reasonImg');
    var arrayOfImgIds = Session.get('arrayOfImgIds');
    for (j = 0; j < images.length; j++)
    {
       var image = images[j].value;
       if(image == evt.target.value )
       {
        //alert(image)
          var error = false;
          FS.Utility.eachFile(evt, function(file) {
        im = Images.insert(file, function (err, fileObj) {
          //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
          if(err){
            error = true;
          }
        });
        if(!error)
        {
          arrayOfImgIds.splice(j,1,im._id);
          var url = document.getElementById('sendFb').value;   
          Meteor.call('updateCover', feedthankId, im._id, url);
        } 
         });
       }
    }
    
    Session.set('arrayOfImgIds', arrayOfImgIds);
  },

    'load #reasonImgInput':function(evt, tmpl){
      Session.set('waiting', false);
     //update send button when image is ready
     FB.XFBML.parse();
  },

 'change .reason':function(evt, tmpl){
  //alert('allReason')
    var texts = document.getElementsByName('reasonText');
    var arrayOfReasons = [];
    var arrayOfImgIds = Session.get('arrayOfImgIds');


    for(i = 0; i < texts.length; i++)
    {

      var text = texts[i].value;
      var picture= arrayOfImgIds[i];
        arrayOfReasons.push({'text':text,'picture':picture});

    }
    var feedthankId = document.getElementById('cover').name;
    Meteor.call('updateReasons', feedthankId, arrayOfReasons);
  },
})



    Template.editFeedthank.helpers ({

        image: function(ids)
        {
          if (typeof (ids) == 'object')
          return Images.find({_id:{$in: ids}});
          else
          {
            //alert(typeof (ids)) string
            return Images.find({_id:ids})
          }
          
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
      image: function(ids)
        {
          if (typeof (ids) == 'object')
          return Images.find({_id:{$in: ids}});
          else
          {
            //alert(typeof (ids)) string
            return Images.find({_id:ids})
          }
          
        },

      waiting: function(){
        return Session.get('waiting');
      }
    })


    Template.reason.helpers({
      image: function(ids)
        {
          if (typeof (ids) == 'object')
          return Images.find({_id:{$in: ids}});
          else
          {
            //alert(typeof (ids)) string
            return Images.find({_id:ids})
          }
          
        },
    })

