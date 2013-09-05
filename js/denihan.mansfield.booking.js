; (function ($) {
    $.fn.denihanBookingEngine = function (options) {
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            triggerSelect: "header#primary nav a#reservations_link",
            closer: "div.section span.closer a",
            onMode: function($el) { $el.css({visibility:"visible"}).animate({top:"118px",opacity:1},{duration: 600}); },
            offMode: function($el) { $el.animate({top:"0px",opacity:0},{duration: 600,complete:function() { $(this).css({visibility:"hidden"}); }}) }
        }, options);

        function initialize($el) {
            // Set DatePickers
            $el.find("div.section input[type='text'].date").datepicker({
                buttonImage: "img/bookingengine/cal.png",
                buttonImageOnly: true,
                buttonText: "Select",
                minDate: 0,
                showOn: "both",
                showOptions: { direction: "down" }
            });

            $el.find("div.section a#additional_options").denihanMoreOptions();
            $el.find("a#best_rate_bubble").denihanToggle({ 
                additionalTrigger : function(on,off,target,$trigger) { $(settings.closer).click(function() { off($trigger,target); }); }
            });
            
            $(settings.triggerSelect).click(function() {
                settings.onMode($el);
            });

            $(settings.closer).click(function() {
                settings.offMode($el);
            });
        }

        return this.each(function () {
            var $this = $(this);
            initialize($this);
        });
    };
})(jQuery);

; (function ($) {
    $.fn.denihanMoreOptions = function (options) {
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            defaultMode: "off"
        }, options);

        function initialize($el) {
            $el.attr("data-denihan-mode", settings["defaultMode"]);

            $el.click(function() {
                var mode = $(this).attr("data-denihan-mode");
                var elementId = "div.more_options." + $(this).attr("id");
                
                if(mode === "on") {
                    $(elementId).animate({height:"0px"},{duration: 1000});
                    $(this).attr("data-denihan-mode", "off");
                }
                else {
                    $(elementId).animate({height:"60px"},{duration: 1000});
                    $(this).attr("data-denihan-mode", "on");
                }
            });
        }

        return this.each(function () {
            var $this = $(this);
            initialize($this);
        });
    };
})(jQuery);