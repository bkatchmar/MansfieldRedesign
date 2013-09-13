; (function ($) {
    $.fn.denihanBookingEngine = function (options) {
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            triggerSelect: "header#primary nav a#reservations_link",
            closer: "div.section span.closer a",
            reserveButton: "div.section.reserve_button a",
            onMode: function($el) { $el.css({visibility:"visible"}).animate({top:"+=30px",opacity:1},{duration: 600}); },
            offMode: function($el) { $el.animate({top:"-=30px",opacity:0},{duration: 600,complete:function() { $(this).css({visibility:"hidden"}); }}) }
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
                var mode = $(this).attr("data-denihan-mode");
                
                if(mode === "off") {
                    settings.onMode($el);
                    $(this).attr("data-denihan-mode", "on");
                }
            });

            $(settings.closer).click(function() {
                settings.offMode($el);
                $(settings.triggerSelect).attr("data-denihan-mode", "off");
            });

            $(settings.reserveButton).denihanProcessBookRequest({ process: function(bookingData) { window.open(bookingData.url); } });
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

; (function ($) {
    $.fn.denihanProcessBookRequest = function (options) {
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            engineSelector: ".bookingengine",
            arrivalSelector: "input.date.arrive",
            departSelector: "input.date.depart",
            adultsSelector: "input.number.adult",
            childrenSelector: "input.number.children",
            promoCodeSelector: "input.option.promo",
            rateTypeSelector: "select.rate_type",
            groupCodeSelector: "input.option.group",
            hotel: "55747",
            chain: "5158",
            process: function(bookingData) { }
        }, options);

        function initialize($el) {
            $el.click(function() { settings.process(buildUrl()); });
        }

        function buildUrl() {
            var arrival = $(settings.engineSelector + " " + settings.arrivalSelector).datepicker({ dateFormat: "mm/dd/yyyy" }).val();
            var depart = $(settings.engineSelector + " " + settings.departSelector).datepicker({ dateFormat: "mm/dd/yyyy" }).val();
            var adults = $(settings.engineSelector + " " + settings.adultsSelector).val();
            var children = $(settings.engineSelector + " " + settings.childrenSelector).val();
            var promo = $(settings.engineSelector + " " + settings.promoCodeSelector).val();
            var rate = $(settings.engineSelector + " " + settings.rateTypeSelector).val();
            var group = $(settings.engineSelector + " " + settings.groupCodeSelector).val();

            var returnUrl = "https://gc.synxis.com/rez.aspx?Hotel=" + settings.hotel + "&Chain=" + settings.chain + "&shell=Flex&template=Flex&start=availresults&arrive=" + arrival + "&depart=" + depart + "&Adult=" + adults + "&Child=" + children + "&promo=" + promo + "&group=" + group + "&filter=" + rate;
            
            return {
                url: returnUrl
            }
        }

        return this.each(function () {
            var $this = $(this);
            initialize($this);
        });
    };
})(jQuery);