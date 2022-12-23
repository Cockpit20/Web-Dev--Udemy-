// $(document).ready(function(){
//     $("h1").css("color","red");
// });

$("h1").addClass("big-title  margin-50");
$("h1").removeClass("big-title");

$("button").text("Don't click me");
$("button").html("<em>Hey</em>");

$("img").attr("src");
$("a").attr("href","https://www.yahoo.com");

$("h1").click(function(){
    $("h1").css("color","purple");
})

for (var i = 0; i < document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click",function(){
        document.querySelector("h1").style.color="purple";
    })
}

$("button").click(function(){
    $("h1").css("color","purple");
})

$("body").keypress(function(event){
    $("h1").text(event.key);
})

$("h1").on("mouseover",function(){
    $("h1").css("color","purple");
})

$("h1").before("<button>New</button>");
$("h1").after("<button>New</button>");
$("h1").prepend("<button>New</button>");
$("h1").append("<button>New</button>");

// $("button").remove();

$("button").click(function(){
    // $("h1").hide();
    // $("h1").show();
    // $("h1").toggle();

    // $("h1").fadeIn();
    // $("h1").fadeOut();
    // $("h1").fadeToggle();

    // $("h1").slideDown();
    // $("h1").slideUp();
    // $("h1").slideToggle();

    $("h1").slideUp().slideDown().animate({opacity:0.5});
})