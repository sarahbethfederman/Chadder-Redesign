!function(){var t=$(window),n=function(n){function i(){n.toggleClass("is-fixed"),o=!o}var o=!1;t.scroll(function(){t.scrollTop()>80?o||i():o&&i()})},i=function(t,n){var i=function(){this.trigger=t,this.contentRef=t.data("content"),this.isActive=!1,this.init(n?n:"click")};return i.prototype.init=function(n){t.on(n,function(){console.log("modal created")})},i}(),o=function(t){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var n=$(this.hash);if(n=n.length?n:$("[name="+this.hash.slice(1)+"]"),n.length)return $("html,body").animate({scrollTop:n.offset().top-t.height()},1e3),!1}})};$(document).ready(function(){var t=$(".nav-bar");n(t),o(t)})}();