// Compression : http://refresh-sf.com/yui/

// // Returns a random integer between min and max , Using Math.round() will give you a non-uniform distribution!
// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// http://paulirish.com/2009/random-hex-color-code-snippets/
function randomHEXColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


var scrolldown = function () {

    jQuery('html,body').animate({ scrollTop: jQuery("#second").offset().top }, 'slow');

    console.log('run');
};

function generateRounds() {

// Variables
    var gWidth = $(window).width();
    var gHeight = $(window).height();
    var widthPer;

// Refresh on resize

    var paper = Raphael(0, 0, gWidth, gHeight);

// paper.setViewBox(0, 0, 940, 600, true);

// Get dimensions 

    /* $(window).resize(function() {location.reload(true)}); */
    window.onresize = function(event) {

        // Setup width
        gWidth = $(window).width(); // window.innerWidth;

        // Setup height
        gHeight = $(window).height();

        // -T- console.log(gWidth, gHeight);
        paper.setSize(gWidth, gHeight);

    };

    // var colorsCombinations = [['#000','#FFF'],['#FFF','#000']];
    var colorsCombinations = ['#81c6dd','#e9b64d','#90ca77'];

    setInterval(function() {

        circle_now = paper.circle(getRandomInt(100, gWidth-100), getRandomInt(100, gHeight-100), getRandomInt(10, 100));

        // Colored 

            var colorLightness = getRandomInt(60,100);

            var randomArrayPosition = Math.floor(Math.random() * colorsCombinations.length);
            circle_now.attr("fill", colorsCombinations[randomArrayPosition]);

            // circle_now.attr("fill", "hsl(0,0%,"+colorLightness+"%)");
            // circle_now.attr("stroke", "hsl(0,0%,"+(colorLightness-25)+"%)"); // randomHEXColor()
            // circle_now.attr("stroke-width", getRandomInt(4, 20) + 'px');
            circle_now.attr("stroke-width", 0);

            /*
                // var randomArrayPosition = Math.floor(Math.random() * colorsCombinations.length);
                // circle_now.attr("fill", colorsCombinations[randomArrayPosition][0]);
                circle_now.attr("stroke", colorsCombinations[randomArrayPosition][1]);
            */

        circle_now.attr("opacity", 0.4);

        // circle_now.blur(6);

        repeat_animation = function(){
            this.remove();
        };

        // {opacity:0,'cx':getRandomInt(0, gWidth+100),'cy':getRandomInt(0,gHeight+100)}
        // console.log(circle_now.getBBox().x,circle_now.getBBox().y,_.random(-10,10));

        circle_now.animate({opacity:0, 'cx':(circle_now.getBBox().x + getRandomInt(-10,100)),'cy':(circle_now.getBBox().y + getRandomInt(-10,100))}, 2600, null, function(){
            this.remove();
        });

        // console.log(circle_now.getBBox().x, circle_now.getBBox().y);

        circle_now.hover(function(){

            if($('.points_counter').css('display') == 'none') {
                $(".points_counter").removeClass("hidden").show(); // .addClass("showDiv");
            }

            this.attr("fill", "#AAA");
            this.attr("opacity", 0.9);

            $("#points_counter").html(++hits);

            this.animate({opacity:0, 'cx':getRandomInt(-100,gWidth+100), 'cy':getRandomInt(-100,gHeight+100)}, getRandomInt(200, 800), "<", function(){
                this.remove();
            });

            if (hits === 5) {
                scrolldown();
            }
        });

        // i++;
        // circle_now.mouseover(function(){this.attr({'cx':getRandomInt (min, max), 'cy':getRandomInt (min, max)})})

    }, getRandomInt(400, 900));
}

// DEFINE GLOBAL VARS
// Points counter
var hits = 0; // parseInt($("#points_counter").text());

/* listen for hover/click */
$(document).ready(function() {
/*
    $("a").hover(function() {
        $("body").css("background-color", "#000");
        $(this).css("color", "#FFF");
    });

    $("a").mouseout(function() {
        $("body").css("background-color", "#FFF");
        $(this).css("color", "#000");
    });
*/
    /*
     $("a").each(function(){
     $(this).mouseover(function() {
     console.dir('log');
     // $("body").css("background-color","#000");
     // $(this).css("color","#FFF");
     });
     });
     */
    
    // Start animation
    generateRounds();
});

// GRAPHICS

