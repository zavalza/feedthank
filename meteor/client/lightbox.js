 //photo lightbox
  $(document).delegate('*[data-toggle="lightbox"][data-gallery="multiimages"]', 'click', function(event) {
        event.preventDefault();
        return $(this).ekkoLightbox();
    });

