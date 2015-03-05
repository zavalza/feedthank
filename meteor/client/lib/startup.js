Meteor.startup(function () {
//Redirect www to ROOT URL in meteor
if(window.location.hostname.search('www') != -1)
  window.location.assign("http://feedthank.com");
//Meteor.subscribe("allDishes");
Session.set('meanings', ['']);
Session.set('arrayOfImgIds',[]);
Session.set('arrayOfMeaningImg',[]);
Session.set('currentFeedthank', null);
Session.set('coverId', null);

Meteor.subscribe('allFeedthanks');
Meteor.subscribe('allImages');
Meteor.subscribe('allProfiles');


      return SEO.config({
        title: 'Feedthank - Dedica tus platillos contando una historia',
        meta: {
          'description': 'Dedica tus platillos contando una historia'
        },
        og: {
          'image': 'http://feedthank.com/background.jpg' 
        }
      });


});