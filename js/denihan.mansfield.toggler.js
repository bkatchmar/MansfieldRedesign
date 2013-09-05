; (function ($) {
    $.fn.denihanToggle = function (options) {
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            defaultMode: "off",
            target: "div.bookingengine div.best_rate_promise",
            onMode: function($trigger,target) { $(target).animate({ opacity: 1 }, { duration: 600 }); $trigger.attr("data-denihan-mode", "on"); },
            offMode: function($trigger,target) { $(target).animate({ opacity: 0 }, { duration: 600 }); $trigger.attr("data-denihan-mode", "off"); },
            additionalTrigger: function(on,off,target,$trigger) { }
        }, options);

        function initialize($el) {
            $el.attr("data-denihan-mode", settings["defaultMode"]);

            settings.additionalTrigger(settings.onMode,settings.offMode,settings.target,$el);

            $el.click(function () {
                var mode = $(this).attr("data-denihan-mode");

                if (mode === "on") {
                    settings.offMode($(this),settings.target);
                }
                else {
                    settings.onMode($(this),settings.target);
                }
            });
        }

        return this.each(function () {
            var $this = $(this);
            initialize($this);
        });
    };
})(jQuery);