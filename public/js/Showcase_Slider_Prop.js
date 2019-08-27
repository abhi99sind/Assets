$(document).ready(function() {
    var autoplaySlider = $('#responsive').lightSlider({
        auto:false,
        loop:false,
        pauseOnHover: true,

        autoWidth:true,

        onBeforeSlide: function (el) {
            $('#current').text(el.getCurrentSlideCount());
        } 
    });
    $('#total').text(autoplaySlider.getTotalSlideCount());
});
