!function(){var e=$(window),t=function(t){function n(){t.toggleClass("is-fixed"),a=!a}var a=!1;e.scroll(function(){e.scrollTop()>80?a||n():a&&n()})},n=function(e,t){var n=function(e,t){this.$triggers=e,this.isActive=!1,this.$modalWindow=t,this.init()};return n.prototype.init=function(){var e=this;e.$modalWindow.on("click",function(){$(this).fadeToggle()}),e.$triggers.bind("click",function(t){e.populate(e.loadContent($(this).data("content"))),e.toggle(),console.log("clicked")})},n.prototype.loadContent=function(e){var t={title:"Our Encryption Technology",content:"<p>The application uses ECDH with SecP256k1 to derive 256 bits keys used in AES encryption in all messages and pictures within a conversation. All content is also signed using ECDSA, but further on with a report system available a user would send the signature to the server which can verify who was the sender of the message. Pictures are encrypted with a key and that key is sent along the message, so the picture can only be de-crypted if the user has access to the message that attached it.</p><p>User data is stored on the device using SQLCipher, a main database contains necessary contents for every user logged in on that device (Token/Cookie for auto login, public key for validation, username, and db key) and is encrypted with a static key. User specific data is stored in a separate file which is encrypted with a randomly generated key and stored in the main database. You can have a password to derive the key of your database using PBKDF2 with multiple rounds of hash. This way the data isn't accessible even if a hacker can capture the files. Server client communication is performed using ASP.NET Web API and SignalR over SSL, ready for a client custom implementation.</p><p>The server only stores users, devices, and relationships(who is friends with whom, banning, conversation members of groups, etc.) data. Messages are destroyed after the device confirmed it was received. Pictures are stored in a separate table and have no relation to who has access or if it was received. For the moment, they are not deleted, in the future every message and picture will be given an expiration date and will be destroyed even if it wasn’t received.</p>"};return t},n.prototype.populate=function(e){this.$modalWindow.children(".modal__title").text(e.title),this.$modalWindow.children(".modal__content").html(e.content)},n.prototype.toggle=function(){this.$modalWindow.fadeToggle(),this.isActive=!this.isActive},n}(),a=function(e){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);if(t=t.length?t:$("[name="+this.hash.slice(1)+"]"),t.length)return $("html,body").animate({scrollTop:t.offset().top-e.height()},1e3),!1}})},i=function(e,t){var n=e,a=t;n.submit(function(e){e.preventDefault();var t=n.serialize();$.ajax({type:"POST",url:n.attr("action"),data:t,success:function(e){a.removeClass("error"),a.addClass("success"),a.text(e),$('[name="name"]').val(""),$('[name="email"]').val(""),$('[name="message"]').val("")},error:function(e){a.removeClass("success"),a.addClass("error"),$$messages.text(""!==e.responseText?e.responseText:"Oops! An error occured and your message could not be sent.")}})})};$(document).ready(function(){console.log("ready");var e=$(".nav-bar"),o=$(".contact-form"),s=$("#form-messages"),r=$(".js-modal");$modal=$(".modal"),t(e),a(e),console.log(r),new n(r,$modal),$(".hamburger").click(function(){$(".mobile-links").slideToggle()}),$(".mobile-links a").click(function(){$(".mobile-links").slideUp()}),i(o,s)})}();