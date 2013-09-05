; (function ($) {
    $.fn.denihanToggle = function (options) {
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            defaultMode: "off",
            target: "div.bookingengine div.best_rate_promise",
            onMode: function(target) { $(target).animate({ opacity: 1 }, { duration: 1000 }); },
            offMode: function(target) { $(target).animate({ opacity: 0 }, { duration: 1000 }); },
            additionalTrigger: function() { }
        }, options);

        function initialize($el) {
            $el.attr("data-denihan-mode", settings["defaultMode"]);

            settings.additionalTrigger();

            $el.click(function () {
                var mode = $(this).attr("data-denihan-mode");

                if (mode === "on") {
                    settings.offMode(setting.target);
                    $(this).attr("data-denihan-mode", "off");
                }
                else {
                    settings.onMode(setting.target);
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