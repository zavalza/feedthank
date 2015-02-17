Template.editFeedthank.rendered = function()
{
  Session.set('reasonsInSession', ['']);

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
    if(Session.get('cover')) //has already uploaded a image, delete it
    {
      Meteor.call('deleteCover',feedthankId, Session.get('cover'));
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
        Session.set('cover', im._id);
        //update db
        Meteor.call('updateCover', feedthankId, im._id);
      }   
    });
  },

  'change .reason':function(evt, tmpl){
    var texts = document.getElementsByName('reasonText');
    var arrayOfReasons = [];
    for(i = 0; i < texts.length; i++)
    {
      var text = texts[i].value;
        arrayOfReasons.push({'text':text});
    }
    var feedthankId = document.getElementById('cover').name;
    Session.set('reasonsInSession', arrayOfReasons);
    Meteor.call('updateReasons', feedthankId, arrayOfReasons);
  },

  'load #coverImgInput':function(evt, tmpl){
    document.getElementById('waitCover').style.height='0px';
     document.getElementById('waitCover').style.visibility='hidden';
  },

  'change #title' : function(evt, tmpl){
    var newTitle = document.getElementById('title').value;
    Meteor.call('updateTitle', this._id, newTitle);
  },

  /*'blur #when' : function(evt, tmpl){
    var newWhen = document.getElementById('when').value;
    alert(newWhen);
  },*/


  'click .newReason' : function(evt, tmpl){
 
    var reasonsArray = Session.get('reasonsInSession');
    reasonsArray.push('');
    Session.set('reasonsInSession', reasonsArray);
  },

  'click .newMeaning' : function(evt, tmpl){
 
    var meaningsArray = Session.get('meanings');
    meaningsArray.push('');
    Session.set('meanings', meaningsArray);
  },

  'click #coverImgInput' : function(evt, tmpl){
  document.getElementById('cover').click();
},

'click #reasonImgInput' : function(evt, tmpl){
  document.getElementById('reasonImg').click();
},

'click #meaningImgInput' : function(evt, tmpl){
  document.getElementById('meaningImg').click();
},

'click .deleteLogo': function(evt, tmpl){
  //alert(this._id)

  Meteor.call('deleteCompanyLogo', Session.get('url'), this._id);
},

'click .cancel':function(evt, tmpl)
    {
      window.history.back();
    },
    'click .save': function(evt, tmpl)
    {
      //alert('salvar');
      /*
      var name= tmpl.find('#name').value;
      var highConcept = tmpl.find('#highConcept').value;
      var website = tmpl.find('#company_url').value;
      var logo = Session.get('logo');
      
      
     
      if(name.length==0 || highConcept.length == 0 || website.length ==0)
      {
        alert ('Por favor llena todos los campos');
        return false;
      }
     var newStartup={
                      types: ["Startup"], //startup, incubator, accelerator, cowork etc.
                      name:name,
                      url:null,
                      logo:logo, //id of logo image
                      description:"",
                      highConcept:highConcept,
                      company_url:website,
                      fb_url:"",
                      twitter_url:"",
                      tag_ids:[],
                      video_url:"",
                      screenshots:[],
                      team:[],
                      followers:{count:0, user_ids:[]},
                      referrer: document.referrer, 
                      timestamp: new Date(),
                      isPublic:false
                    };

      Session.set('logo', null);
      Meteor.call('addNewCompany', newStartup);
      alert('Los datos serán revisados y si la compañía cumple con el perfil de startup se hará pública');
      //go to new idea profile
      //alert(EJSON.stringify(impulseDoc));
      window.history.back();
      */
    }

  });


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

Template.editFeedthank.cover =function()
{
  return Session.get('cover');
}

Template.editFeedthank.reasonsInSession = function()
{
  return Session.get('reasonsInSession');
}

Template.editFeedthank.meanings = function()
{
  return Session.get('meanings');
}
