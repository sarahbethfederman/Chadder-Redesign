!function(){var e=$(window),t=function(t){function n(){t.toggleClass("is-fixed"),o=!o}var o=!1;e.scroll(function(){e.scrollTop()>80?o||n():o&&n()})},n=function(e,t){var n=function(){this.trigger=e,this.contentRef=e.data("content"),this.isActive=!1,this.init(t?t:"click")};return n.prototype.init=function(t){var n=this;e.on(t,function(){console.log("modal created"),n.open()})},n.prototype.open=function(){},n}(),o=function(e){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html,body").animate({scrollTop:t.offset().top-e.height()},1e3),!1}})},a=function(e,t){var n=e,o=t;n.submit(function(e){e.preventDefault();var t=n.serialize();$.ajax({type:"POST",url:n.attr("action"),data:t,success:function(e){o.removeClass("error"),o.addClass("success"),o.text(e),$('[name="name"]').val(""),$('[name="email"]').val(""),$('[name="message"]').val("")},error:function(e){o.removeClass("success"),o.addClass("error"),$$messages.text(""!==e.responseText?e.responseText:"Oops! An error occured and your message could not be sent.")}})})};$(document).ready(function(){var e=$(".nav-bar"),n=$(".contact-form"),s=$("#form-messages"),r=$(".js-modal");t(e),o(e),a(n,s)})}();