var $containerDiv = $("body").append("<div id='container'></div>");
// A brown rectangle for the row
var $barDiv = $("#container").append("<div class='bar'></div>");
// A purple square for bartender
var $bartenderDiv = $("#container").append("<div id='bartender'></div>");
// The customer will be a red square MOVING to the right
var $customerDiv = $("#container").append("<div class='customer'></div>");
//move the customer across the bar towards the bartender
$("body").ready(function() {
  $(".customer").animate(
    {
      left: "+=410"
    },
    10000,
    function() {
      // Animation complete.
      // ** the customer reached the end of the bar // kill the bartender
    }
  );
});
// Spacebar will TRIGGER the beer to appear, a small white square
// send the beer and animating it with the space bar is messing me up
// so just take it back to no keydown or keyup events and focus on the collison
// with the customer animation and the sendthebeer animation
/////////////////////////////////////////// KEYDOWN EVENTS ///////////////////////
var $bartenderDiv = $("#container").append("<div class='beer'></div>");
$beer = $(".beer");
$beer.append("<div class='liquid'></div>");
$("body").ready(sendTheBeer);
//move the beer across the bar
function sendTheBeer() {
  //$beer.off("keyup", stopFillTheBeer);
  //$beer.off("keydown", fillTheBeer);
  $beer.css("display", "block");
  $(".liquid").css("background-color", "yellow");
  $beer.animate(
    {
      left: "-=460"
    },
    10000,
    function() {
      // Animation complete.
    }
  );
}

//}
//$("body").on("keydown", fillTheBeer);
//$("body").on("keyup", stopFillTheBeer);

// function fillTheBeer(evt) {
//   var keyPressed = event.which;
//   switch (keyPressed) {
//     case 32: //spacebar
//       $(".liquid").animate(
//         {
//           height: "-=30"
//         },
//         1000,
//         // Animation complete.
//         sendTheBeer()
//       );

//       $beer.css("display", "block");
//       //$beer.css("background-color", "yellow");
//       break;
//     default:
//       console.log(keyPressed);
//   }
// }

/////////////////////////////////////////// KEYUP EVENTS ///////////////////////
// function stopFillTheBeer(evt) {
//   var keyPressed = event.which;
//   switch (keyPressed) {
//     case 32: //spacebar
//       $beer.css("display", "none");
//       //$beer.css("background-color", "white");
//       break;
//     default:
//       console.log(keyPressed);
//   }
// }
// The beer will be white for 2 seconds and change to yellow before it will be sent down the row
// The beer will collide with customer
// The customer will change to green and start moving to the left
