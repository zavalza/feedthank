Template.editFeedthank.rendered = function()
{
  //hide edite from other users? make isPublic:false



  //datimepicker package
  var picker = $('.date').datetimepicker({ sideBySide: true});
  picker.on('change', function(e){
    var feedthankId = document.getElementById('cover').name;
       Meteor.call('updateWhen', feedthankId, document.getElementById('when').value )
    });

}

Template.reason.rendered = function()
{
    //Show all placeholders
  $("textarea").each(function(){
        $(this).focus();
        $(this).blur();
    });
}

Template.meaning.rendered = function()
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
        Meteor.call('updateCover', feedthankId, im._id);
      }   
    });
  },


  'load #coverImgInput':function(evt, tmpl){
    document.getElementById('waitCover').style.height='0px';
     document.getElementById('waitCover').style.visibility='hidden';
  },

  'change #title' : function(evt, tmpl){
    var newTitle = document.getElementById('title').value;
    Meteor.call('updateTitle', this._id, newTitle);
  },


  'click .newReason' : function(evt, tmpl){
    var feedthankId = document.getElementById('cover').name;
    Meteor.call('addReason', feedthankId);
    var arrayOfImgIds = Session.get('arrayOfImgIds');
    arrayOfImgIds.push(null);
    Session.set('arrayOfImgIds', arrayOfImgIds);
  },

  'click .newMeaning' : function(evt, tmpl){
    var feedthankId = document.getElementById('cover').name;
     Meteor.call('addMeaning', feedthankId);
    var arrayOfMeaningImg = Session.get('arrayOfMeaningImg');
    arrayOfMeaningImg.push(null);
    Session.set('arrayOfMeaningImg', arrayOfMeaningImg);
  },

  'click #coverImgInput' : function(evt, tmpl){
  document.getElementById('cover').click();
},

    'click .publish': function(evt, tmpl)
    {
      //check for fields??

      //make public the feedthank
      var feedthankId = document.getElementById('cover').name;
      Meteor.call('publishFeedthank', feedthankId);
    
    FB.ui({
  method: 'send',
  link: 'http://www.nytimes.com/2011/06/15/arts/people-argue-just-to-win-scholars-assert.html',
});


      //Show new feedthank
      //Router.go('feedthank')
      //Router.go('home');
    }

  });


Template.reason.events({
  'click #reasonImgInput' : function(evt, tmpl){
    evt.preventDefault();
 var imgFile = tmpl.find('.reasonImg');
 imgFile.click();
},

  'change .reasonImg':function(evt, tmpl){
    //alert('reasonImg');
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
        } 
         });
       }
    }
    
    Session.set('arrayOfImgIds', arrayOfImgIds);
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

Template.meaning.events({

   'click #meaningImgInput' : function(evt, tmpl){
    evt.preventDefault();
 var imgFile = tmpl.find('.meaningImg');
 imgFile.click();
},

  'change .meaningImg':function(evt, tmpl){
    //alert('meaningImg');
    var images = document.getElementsByName('meaningImg');
    var arrayOfMeaningImg = Session.get('arrayOfMeaningImg');
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
          arrayOfMeaningImg.splice(j,1,im._id);
        } 
         });
       }
    }
    
    Session.set('arrayOfMeaningImg', arrayOfMeaningImg);
  },

 'change .meaning':function(evt, tmpl){
  //alert('allReason')
    var texts = document.getElementsByName('meaningText');
    var arrayOfMeanings = [];
    var arrayOfMeaningImg = Session.get('arrayOfMeaningImg');


    for(i = 0; i < texts.length; i++)
    {

      var text = texts[i].value;
      var picture= arrayOfMeaningImg[i];
        arrayOfMeanings.push({'text':text,'picture':picture});

    }
    var feedthankId = document.getElementById('cover').name;
    Meteor.call('updateMeanings', feedthankId, arrayOfMeanings);
  },
})

    Template.editFeedthank.helpers ({

       user:function(userId)
       {
          return Meteor.users.find({_id:userId})
       },
       
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
    });

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

    Template.meaning.helpers({
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
