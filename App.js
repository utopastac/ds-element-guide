/*



MAIN APP HERE



*/

function App(args) {

    $.window = $(window);
    $.body = $("body");
    $.ww = $.window.width();
    $.wh = $.window.height();
    $.mobile = Utils.checkMobile();
	$.tablet = Utils.checkTablet();
	if($.mobile || $.tablet){
		 $.body.removeClass("desktop");
	}
    
    $.useCssAnim = Modernizr.csstransforms3d;

    this.main = $("#main-content");
    this.navigation = $("#navigation-main");
    this.examples = $(".sg--example");
    this.codeOn = false;
    this.navigationOpen = false;
    this.themes = '<div id = "theme-changer"><h5>Choose a colour theme</h5><ul class = "list list--stepped"><li data-theme = "theme--green">Green</li><li data-theme = "theme--gold">Gold</li><li data-theme = "theme--blue">Blue</li><li data-theme = "theme--purple">Purple</li><li data-theme = "theme--orange">Orange</li><li data-theme = "theme--teal">Teal</li><li data-theme = "theme--navy">Navy</li><li data-theme = "theme--grey">Grey</li><li data-theme = "theme--lilac">Lilac</li></ul></div>'

    this.init(args);

}

App.prototype = {

    init:function(args){

        this.settings = args;

        $("#navigation-main").load("partials/navigation.html", jQuery.proxy(this, "navigationLoaded"));

        this.examples.each(function(index){
            var elem = $(this);
            if(elem.hasClass("no-code")) return;
            var html = elem.html();
            var htmlString = html.replace("<!-- content -->", "").replace("<!-- -->", "").replace(/&/g, '&amp;').replace(/</g, '&lt;');
            $(this).after("<pre><code class='prettyprint'>" + htmlString + "</code></pre>");
            //$(this).after(that.getStyles(elem));
        });

        this.createNavigation();

        

        $.window.resize(jQuery.proxy(this, "resizeElements"));
        this.resizeElements();

        this.drawGrid();
    },

    drawGrid: function(){

        var wt = 360
        var ht = 120
        
        drawGridToDimensions("grid-1", wt, ht, 4, 4, "rgba(0,0,0,0.08)")
        drawGridToDimensions("grid-2", wt, ht, 40, 40, "rgba(44,110,250,0.4)")
    },

    navigationLoaded: function(){
        TweenMax.from("#navigation-main", 0.75, {alpha:0});
        $(this.settings.page).addClass("active");
        $("#toggle-code").click(jQuery.proxy(this, "toggleCode"));
        $("#change-theme").click(jQuery.proxy(this, "toggleThemes"));
        $("pre").hide();

        $("body").append('<div id = "navigation-toggle"></div>' + this.themes);

        $("#theme-changer li").click(jQuery.proxy(this, "changeTheme"));
        this.setTheme();
        $("#navigation-toggle").on("tap", jQuery.proxy(this, "toggleNavigation"));
    },

    createNavigation: function(){

        var str = "<h5>Contents</h5><ul>"

        var pre = "<li><a href = '"
        var mid = "'>"
        var end = "</a></li>"

        var sections = $("section");
        if(sections.length < 1) return

        for(var i=0;i<sections.length; i++){
            var section = sections.eq(i);
            var url = "#" + section.attr("id");
            var title = $("> header h2", section).html();
            str += pre + url + mid + title + end;
        }

        $("#page-heading").append(str);


        $("#page-heading ul a").click(jQuery.proxy(this, "scrollPage"));
    },

    scrollPage: function(event){
        var elem = $(event.currentTarget);
        var target = $(elem.attr("href"));
        var yt = target.offset().top
        var diff = yt -$(window).scrollTop();
        var speed = Math.max(0.25, Math.min(diff/1000, 1.5));
        TweenMax.to(window, speed, {scrollTo:{y:yt}, ease:Power3.easeOut});
        event.preventDefault();
        return false;
    },

    getStyles: function(elem){
        var str = "<div class = 'sg--style-info'>"
        var size = elem.css('font-size') + "px";
        var height = elem.height();
        str += this.getStyleString("font-size", size)
        str += this.getStyleString("height", height)
        str += "</div>"
        alert
        return str
    },

    getStyleString: function(attr, value){
        return "<p>" + attr + ": <span>" + value + "</span></p>"
    },

    toggleCode: function(){
        this.codeOn = !this.codeOn;
        if(this.codeOn){
            $("pre").show();
            $("#toggle-code").addClass("active").html("hide code");
        } else {
            $("#toggle-code").removeClass("active").html("show code");
            $("pre").hide();
        }
    },

    toggleThemes: function(){
        $("#theme-changer").toggle();
    },

    changeTheme: function(event){
        var elem = $(event.currentTarget);
        var theme = elem.data("theme");
        localStorage.setItem('theme', theme);
        this.setTheme();
    },

    setTheme: function(){
        var theme = localStorage.getItem('theme');
        $("body").removeClass().addClass(theme);
        $("#theme-changer").hide();
        $("#theme-changer li").removeClass("active");
        $("[data-theme='" + theme + "']").addClass("active");
    },

    toggleNavigation: function(){
        this.navigationOpen = !this.navigationOpen;
        $("body").toggleClass("navigation-open");
        if(this.navigationOpen){
            this.main.on("tap", jQuery.proxy(this, "toggleNavigation"));
        } else {
            this.main.off();
        }
    },

    resizeElements: function(event){
        $.ww = $.window.width();
        $.wh = $.window.height();
        $.mobile = Utils.checkMobile();
    }

}

function drawGridToDimensions(elem, wt, ht, gridWidth, gridHeight, colour){

    var canvas = document.getElementById(elem);
    var ctx = canvas.getContext("2d");

    ctx.clearRect (0, 0, wt, ht);
    ctx.canvas.width  = wt;
    ctx.canvas.height = ht;
    ctx.strokeStyle = colour;
    ctx.lineWidth = (1);

    ctx.translate(-0.5,-0.5)

    ctx.beginPath();

    var cols = Math.floor(wt/gridWidth);
    var rows = Math.floor(ht/gridHeight);

    var i = 0;
    for(i = 0; i < cols-1; i++){
        var left = (wt / cols) * (i+1);
        ctx.moveTo(left, 0);
        ctx.lineTo(left + 0, ht + 0);
    }
    for(i = 0; i < rows-1; i++){
        var top = (ht / rows) * (i+1);
        ctx.moveTo(0, top + 0);
        ctx.lineTo(wt, top + 0);
    }
    ctx.stroke();


}
