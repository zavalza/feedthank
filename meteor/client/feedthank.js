
/*Template.feedthank.rendered= function(){
  document.getElementById('galleryImage').click();
}*/

 Template.feedthank.helpers({

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

