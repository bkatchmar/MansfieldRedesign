jQuery(document).ready(function () {
    jQuery("div.bookingengine").denihanBookingEngine({ triggerSelect: "div.header#primary div.nav a#reservations_link" });

    jQuery("#hero_image_gallery").flexslider({
        animation: "slide"
    });
});