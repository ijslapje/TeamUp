$(document).ready(function() {
$(function () {
        $("#tabs").tabs({
             show: {
                 effect: "fadeIn",
                 duration: 200,
                 delay: 0
             },
             hide: {
                 effect: "fadeOut",
                 duration: 200,
                 delay: 0
             },
             activate: function (event, ui) {
                 // Just for demonstrating

             }
         });
     });
});