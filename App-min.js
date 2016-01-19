function App(e){$.window=$(window),$.body=$("body"),$.ww=$.window.width(),$.wh=$.window.height(),$.mobile=Utils.checkMobile(),$.tablet=Utils.checkTablet(),($.mobile||$.tablet)&&$.body.removeClass("desktop"),$.useCssAnim=Modernizr.csstransforms3d,this.main=$("#main-content"),this.navigation=$("#navigation-main"),this.examples=$(".sg--example"),this.codeOn=!1,this.navigationOpen=!1,this.themes='<div id = "theme-changer"><h5>Choose a colour theme</h5><ul class = "list list--stepped"><li data-theme = "theme--green">Green</li><li data-theme = "theme--gold">Gold</li><li data-theme = "theme--blue">Blue</li><li data-theme = "theme--purple">Purple</li><li data-theme = "theme--orange">Orange</li><li data-theme = "theme--teal">Teal</li><li data-theme = "theme--navy">Navy</li><li data-theme = "theme--grey">Grey</li><li data-theme = "theme--lilac">Lilac</li></ul></div>',this.init(e)}function drawGridToDimensions(e,t,i,a,n,o){var h=document.getElementById(e),s=h.getContext("2d");s.clearRect(0,0,t,i),s.canvas.width=t,s.canvas.height=i,s.strokeStyle=o,s.lineWidth=1,s.translate(-.5,-.5),s.beginPath();var l=Math.floor(t/a),r=Math.floor(i/n),g=0;for(g=0;l-1>g;g++){var d=t/l*(g+1);s.moveTo(d,0),s.lineTo(d+0,i+0)}for(g=0;r-1>g;g++){var c=i/r*(g+1);s.moveTo(0,c+0),s.lineTo(t,c+0)}s.stroke()}App.prototype={init:function(e){this.settings=e,$("#navigation-main").load("partials/navigation.html",jQuery.proxy(this,"navigationLoaded")),this.examples.each(function(e){var t=$(this);if(!t.hasClass("no-code")){var i=t.html(),a=i.replace("<!-- content -->","").replace("<!-- -->","").replace(/&/g,"&amp;").replace(/</g,"&lt;");$(this).after("<pre><code class='prettyprint'>"+a+"</code></pre>")}}),this.createNavigation(),$.window.resize(jQuery.proxy(this,"resizeElements")),this.resizeElements(),this.drawGrid()},drawGrid:function(){var e=360,t=120;drawGridToDimensions("grid-1",e,t,4,4,"rgba(0,0,0,0.08)"),drawGridToDimensions("grid-2",e,t,40,40,"rgba(44,110,250,0.4)")},navigationLoaded:function(){TweenMax.from("#navigation-main",.75,{alpha:0}),$(this.settings.page).addClass("active"),$("#toggle-code").click(jQuery.proxy(this,"toggleCode")),$("#change-theme").click(jQuery.proxy(this,"toggleThemes")),$("pre").hide(),$("body").append('<div id = "navigation-toggle"></div>'+this.themes),$("#theme-changer li").click(jQuery.proxy(this,"changeTheme")),this.setTheme(),$("#navigation-toggle").on("tap",jQuery.proxy(this,"toggleNavigation"))},createNavigation:function(){var e="<h5>Contents</h5><ul>",t="<li><a href = '",i="'>",a="</a></li>",n=$("section");if(!(n.length<1)){for(var o=0;o<n.length;o++){var h=n.eq(o),s="#"+h.attr("id"),l=$("> header h2",h).html();e+=t+s+i+l+a}$("#page-heading").append(e),$("#page-heading ul a").click(jQuery.proxy(this,"scrollPage"))}},scrollPage:function(e){var t=$(e.currentTarget),i=$(t.attr("href")),a=i.offset().top,n=a-$(window).scrollTop(),o=Math.max(.25,Math.min(n/1e3,1.5));return TweenMax.to(window,o,{scrollTo:{y:a},ease:Power3.easeOut}),e.preventDefault(),!1},getStyles:function(e){var t="<div class = 'sg--style-info'>",i=e.css("font-size")+"px",a=e.height();return t+=this.getStyleString("font-size",i),t+=this.getStyleString("height",a),t+="</div>",alert,t},getStyleString:function(e,t){return"<p>"+e+": <span>"+t+"</span></p>"},toggleCode:function(){this.codeOn=!this.codeOn,this.codeOn?($("pre").show(),$("#toggle-code").addClass("active").html("hide code")):($("#toggle-code").removeClass("active").html("show code"),$("pre").hide())},toggleThemes:function(){$("#theme-changer").toggle()},changeTheme:function(e){var t=$(e.currentTarget),i=t.data("theme");localStorage.setItem("theme",i),this.setTheme()},setTheme:function(){var e=localStorage.getItem("theme");$("body").removeClass().addClass(e),$("#theme-changer").hide(),$("#theme-changer li").removeClass("active"),$("[data-theme='"+e+"']").addClass("active")},toggleNavigation:function(){this.navigationOpen=!this.navigationOpen,$("body").toggleClass("navigation-open"),this.navigationOpen?this.main.on("tap",jQuery.proxy(this,"toggleNavigation")):this.main.off()},resizeElements:function(e){$.ww=$.window.width(),$.wh=$.window.height(),$.mobile=Utils.checkMobile()}};