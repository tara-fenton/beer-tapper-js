var bars = 4;

var $containerDiv = $("body").append("<div id='container'></div>");

// A purple square for bartender
var $bartenderDiv = $("#container").append("<div id='bartender'></div>");
// The customer will be a red square MOVING to the right
var $customerDiv = $("#container").append("<div class='customer'></div>");
$customer = $(".customer");
// The beer will be white for 2 seconds and change to yellow before it will be sent down the row
var $beerDiv = $("#container").append("<div class='beer'></div>");
$beer = $(".beer");
$beer.append("<div class='liquid'></div>");

//$barDiv;
function createBarElements() {
  // A brown rectangle for the row
  for (var i = 0; i <= bars; i++) {
    var $barDiv = $("#container").append("<div class='bar'></div>");

    //data-box-index="1
    //var $barDiv =
    //$barDiv.attr("id", "data-bar-index" + i);
    //$("#data-bar-index" + i).css("top", (i + 1) * 120);
  }
}
createBarElements();
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
// Spacebar will TRIGGER the beer to appear, a small white square
// send the beer and animating it with the space bar is messing me up
// so just take it back to no keydown or keyup events and focus on the collison
// with the customer animation and the sendthebeer animation

$("body").on("keydown", fillTheBeer);

$("body").on("keyup", stopFillTheBeer);

function fillTheBeer(evt) {
  if (event.which === 32) {
    $(".liquid").animate(
      { height: "-=30" },
      1000,
      // Animation complete.
      function() {
        // Animation complete.
        $("body").off("keyup", stopFillTheBeer);
        $("body").off("keydown", fillTheBeer);

        beerIsBeingSent = true;
        sendTheBeer();
      }
    );
    $beer.css("display", "block");
  }
}
/////////////////////////////////////////// KEYDOWN EVENTS ///////////////////////

//move the beer across the bar
function sendTheBeer() {
  $beer.css("display", "block");
  $beer.animate({ left: "-=460" }, 10000);
}

function stopFillTheBeer() {
  $(".liquid").css("height", "30px");
  $(".liquid").stop();
  $beer.css("display", "none");
}
/////////////////////////////////////////// SET INTERVAL - COLLISONS ///////////
/// set an interval to constantly test for collison
var count = 0;
var intId = setInterval(counter, 100);
var $beerPosition = 700;
var $customerPosition;
var beerIsBeingSent = false;
function counter() {
  $beerPosition = $beer.position();
  $customerPosition = $customer.position();
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

/////////////////////////////////////////// KEYUP EVENTS ///////////////////////

// Create four rows and four taps
