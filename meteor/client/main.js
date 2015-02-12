Meteor.startup(function () {
//Redirect www to ROOT URL in meteor
if(window.location.hostname.search('www') != -1)
  window.location.assign("http://feedthank.com");
//Meteor.subscribe("allDishes");

});


  Template.pitch.events({

    'click button': function () {
      Router.go('newCostumer');
    }
  });

