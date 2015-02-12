
 Template.home.helpers({
  dish: function()
  {
    return Dishes.find({});
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
    

 })

Template.dishThumbnail.rendered = function()
 {

  var maxHeight = 0;
  $('.thumbText').each(function(){
        var h = $(this).height();
        if(h > maxHeight)
        {
          //alert(h);
          maxHeight = h;
        }
    });
  $('.thumbText').each(function(){
        $(this).css('height',maxHeight);
    });
}


Template.dishThumbnail.helpers({


    image: function(ids)
        {
          //alert(ids);
          if (typeof (ids) == 'object')
          return Images.find({_id:{$in: ids}});
          else
          {
            //alert(typeof (ids)) string
            return Images.find({_id:ids})
          }
          
        },
})