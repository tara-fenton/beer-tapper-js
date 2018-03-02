var $containerDiv = $("body").append("<div id='container'></div>");
/////////////////////////////////////////// BAR ///////////////////////
var bars = 4;
var spaceBetweenBars = 80;
// Create four rows and four taps
function createBarElements() {
  // A brown rectangle for the row
  for (var i = 0; i < bars; i++) {
    var $barDiv = $("<div class='bar'></div>");
    $("#container").append($barDiv);
    $barDiv.attr("id", "data-bar-index" + i);
    $barDiv.css("top", spaceBetweenBars * i + spaceBetweenBars + "px");
  }
}
createBarElements();
/////////////////////////////////////////// CUSTOMERS ///////////////////////
var customers = 4;
var bartenderYstart = 60;
var customerHeight = 80;
var $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);
// The customer will be a red square MOVING to the right
// Create a customer per bar row
function createCustomers() {
  for (var i = 0; i < customers; i++) {
    var $customerDiv = $("<div class='customer'></div>");
    $customersDiv.append($customerDiv);
    $customerDiv.attr("id", "data-customer-index" + i);
    $customerDiv.css("top", customerHeight / 2 * i + "px");
    $customerDiv.css("left", "30px");
    console.log($customerDiv.css("top"));
  }
}
createCustomers();

//move the customer across the bar towards the bartender
$("body").ready(customerMoving);
function customerMoving() {
  $(".customer").animate({ left: "+=410" }, 10000, function() {
    // Animation complete.
    // ** the customer reached the end of the bar // kill the bartender
  });
}

function customerStopMoving() {
  $(".customer").css("backgroundColor", "green");
  $(".customer").animate({ left: "-=410" }, 10000, function() {
    // Animation complete.
    // ** the customer reached the end of the bar // kill the bartender
  });
}
/////////////////////////////////////////// BEER ///////////////////////
// The beer will be white for 2 seconds and change to yellow before it will be sent down the row

var beerCount = 0;
function createBeer() {
  //add the liquid for the beer
  //var $liquid = $("<div class='liquid'></div>");
  //$("#container").append($liquid);

  var $beerDiv = $("<div class='beer'></div>");
  $beerDiv.attr("id", "data-beer-index" + beerCount);
  $("#container").append($beerDiv);

  //beerCount++;
  return $beerDiv;
}

//$("body").on("keydown", fillTheBeer);

//$("body").on("keyup", stopFillTheBeer);

function fillTheBeer(evt) {
  console.log("hello");
  if (event.which === 32) {
  }
}
//move the beer across the bar
function sendTheBeer() {
  $beer.css("display", "block");
  $beer.animate({ left: "-=460" }, 10000);
}

function stopFillTheBeer() {}

/////////////////////////////////////////// SET INTERVAL - COLLISONS ///////////
/// set an interval to constantly test for collison
var count = 0;
//var intId = setInterval(counter, 100);
var $beerPosition = 700;
var $customerPosition;
var beerIsBeingSent = false;
function counter() {
  $beerPosition = $beer.position();
  //$customerPosition = $customer.position(); // HELP!!!
  //if customer and beer collide
  // 40 is the width of the customer // how can i grab that value?
  if (beerIsBeingSent) {
    if ($beerPosition.left < $customerPosition.left + 40) {
      //console.log("WE HAVE COLLIDED!");
      clearInterval(intId);
      // this is where the customer will drink the beer
      // for now just remove the beer
      $beer.remove();
      // and change the direction of the customer to go back to the left/..door
      //stop the customer animation
      // stop , finish , clearque
      $customer.stop();
      customerStopMoving();
    }
  }
}
//}

/////////////////////////////////////////// BARTENDER /////////////////
// A purple square for bartender
var $bartenderDiv = $("<div id='bartender'></div>");
$("#container").append($bartenderDiv);

var bartenderHeight = 80;
var bartenderYstart = 60;
var bartenderXstart = 500;
$bartenderDiv.css("top", bartenderYstart + "px");
$bartenderDiv.css("left", bartenderXstart + "px");
//$bartenderDiv.css("height", bartenderHeight + "px");
var currentYbartender = 0;
var newYbartender = 0;
var currentXbartender = 0;
var newXbartender = 0;
/////////////////////////////////////////// KEY DOWN /////////////////
$("body").on("keydown", function(evt) {
  // get the current x and y of bartender
  currentYbartender = $bartenderDiv.css("top");
  currentYbartender = parseInt(currentYbartender);
  currentXbartender = $bartenderDiv.css("left");
  currentXbartender = parseInt(currentXbartender);

  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: /////////// SPACEBAR
      console.log("spacebar - pouring beer");
      // $(".liquid").animate(
      //   { height: "-=30" },
      //   1000,
      //   // Animation complete.
      //   function() {
      //     // Animation complete.
      //     $("body").off("keyup", stopFillTheBeer);
      //     $("body").off("keydown", fillTheBeer);
      //     //on("keydown", fillTheBeer);

      //     beerIsBeingSent = true;
      //     sendTheBeer();
      //   }
      // );
      $beer = createBeer();
      //$("liquid").animate({ height: "-=30" }, 1000);
      $beer.css("display", "block");
      // jump back to tap by pouring (space bar)
      $bartenderDiv.css("left", bartenderXstart + "px");
      break;
    case 37: //left key LEFT
    case 65: //   a key LEFT
      newXbartender = currentXbartender - 5;
      newXbartender += "px";
      $bartenderDiv.css("left", newXbartender);
      // TO DO : catch a beer glass
      break;
    case 39: // right key RIGHT
    case 83: //     s key RIGHT
      newXbartender = currentXbartender + 5;
      newXbartender += "px";
      $bartenderDiv.css("left", newXbartender);
      break;
    case 13: //return key UP
    case 20: //  caps key UP
    case 38: //     arrow UP
      newYbartender =
        currentYbartender - spaceBetweenBars - bartenderHeight / 2;

      // loop around from the top to the bottom
      if (newYbartender < bartenderYstart) {
        newYbartender =
          bartenderYstart + spaceBetweenBars * bars + bartenderHeight / 2;
      }
      // set the y position of bartender
      newYbartender += "px";
      $bartenderDiv.css("top", newYbartender);
      // TO DO : stop pouring by moving to another row
      break;
    case 16: // shift DOWN
    case 40: // arrow DOWN
      newYbartender =
        currentYbartender + spaceBetweenBars + bartenderHeight / 2;

      // loop around from the bottom to the top and from the top to the bottom
      var downLimit =
        bartenderYstart + spaceBetweenBars * (bars + 1) + bartenderHeight / 2;
      if (newYbartender >= downLimit) {
        newYbartender = bartenderYstart;
      }
      // set the y position of bartender
      newYbartender += "px";
      $bartenderDiv.css("top", newYbartender);
      // TO DO : stop pouring by moving to another row
      break;
    default:
      console.log(keyPressed);
      break;
  }
});
/////////////////////////////////////////// KEY UP /////////////////

// $("body").on("keyup", function(evt) {
//   var keyPressed = event.which;
//   switch (keyPressed) {
//     case 32: //spacebar
//       // NEED HELP!!!
//       // $(".liquid").css("height", "30px");
//       // $(".liquid").stop();
//       // $beer.css("display", "none");
//       console.log("spacebar");
//       break;
//     default:
//       console.log(keyPressed);
//       break;
//   }
// });

// Spacebar will TRIGGER the beer to appear, a small white square
// send the beer and animating it with the space bar is messing me up
// so just take it back to no keydown or keyup events and focus on the collison
// with the customer animation and the sendthebeer animation
