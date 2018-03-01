var $containerDiv = $("body").append("<div id='container'></div>");
// A brown rectangle for the row
var $barDiv = $("#container").append("<div class='bar'></div>");
// A purple square for bartender
var $bartenderDiv = $("#container").append("<div id='bartender'></div>");
// The customer will be a red square MOVING to the right
var $customerDiv = $("#container").append("<div class='customer'></div>");
$customer = $(".customer");
// The beer will be white for 2 seconds and change to yellow before it will be sent down the row
var $beerDiv = $("#container").append("<div class='beer'></div>");
$beer = $(".beer");
$beer.append("<div class='liquid'></div>");

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

/// set an interval to constantly test for collison
var count = 0;
var intId = setInterval(counter, 100);
var $beerPosition;
var $customerPosition;
function counter() {
  //if customer and beer collide
  $beerPosition = $beer.position();
  $customerPosition = $customer.position();
  // 40 is the width of the customer // how can i grab that value?
  if ($beerPosition.left < $customerPosition.left + 40) {
    //console.log("WE HAVE COLLIDED!");
    clearInterval(intId);
    // this is where the customer will drink the beer
    // for now just remove the beer
    // and change the direction of the customer to go back to the left/..door
  }
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
