/////////////////////////////////////////// BAR ///////////////////////
var $containerDiv = $("body").append("<div id='container'></div>");
var BARS_AMOUNT = 4;
var BAR_PADDING = 80;

// Create four rows
// TO DO : and four taps
function createBarElements() {
  for (var i = 0; i < BARS_AMOUNT; i++) {
    var $barDiv = $("<div class='bar'></div>");
    $("#container").append($barDiv);
    $barDiv.attr("id", "data-bar-index" + i);
    $barDiv.css("left", BAR_PADDING + "px");
    $barDiv.css("top", BAR_PADDING * i + BAR_PADDING + "px");
  }
}
createBarElements();
/////////////////////////////////////////// CUSTOMERS ///////////////////////
var $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);
var CUSTOMER_AMOUNT = 4;
var CUSTOMER_HEIGHT = 80;
var customersObj = {};

// Create a customer per bar row
function createCustomers() {
  for (var i = 0; i < CUSTOMER_AMOUNT; i++) {
    var $customerDiv = $("<div class='customer'></div>");
    $customersDiv.append($customerDiv);
    $customerDiv.attr("id", "data-customer-index" + i);
    $customerDiv.css("top", CUSTOMER_HEIGHT / 2 * i + "px");
    $customerDiv.css("left", "30px");
    // customer object
    var customerObj = {};
    customerObj.id = "data-customer-index" + i;
    customerObj.element = $customerDiv;
    customerObj.movingForward = true;
    customerObj.drinking = false;
    customerObj.endOfBar = false; // testing in an interval
    customerObj.barRow = i;
    customerObj.startTime = i; // something random
    customersObj[i] = customerObj;
  }
}
createCustomers();

var beerPosition = 0;
var cutomerPosition = 0;

// TO DO : The beers will collide with several customers

var getCustomerHits = setInterval(customerHitsBeer, 100);
function customerHitsBeer() {
  // loop through the customer
  for (var customer in customersObj) {
    // get the position of the customer
    // loop through the customers
    for (var beer in beersObj) {
      // get the position of the beer and customer
      beerPosition = parseInt(beersObj[beer].beer.css("left"));
      customerPosition = parseInt(customersObj[customer].element.css("left"));
      console.log(beerPosition, customerPosition);
      //test for collision
      if (beerPosition < cutomerPosition + 40) {
        clearInterval(customerHitsBeer);
        console.log(" WE HAVE COLLISION " + beerPosition);
      }
    }
  }
}
//move the customer across the bar towards the bartender
$("body").ready(customerMoving);
function customerMoving() {
  $(".customer").animate({ left: "+=410" }, 10000, function() {
    // Animation complete.
    // ** the customer reached the end of the bar // kill the bartender
  });
  for (var customer in customersObj) {
    //console.log("OBJ. " + customersObj[customer].barRow);
  }
}

function customerStopMoving() {
  $(".customer").css("backgroundColor", "green");
  $(".customer").animate({ left: "-=410" }, 10000, function() {
    // Animation complete.
    // ** the customer reached the end of the bar // kill the bartender
  });
}
/////////////////////////////////////////// BEER ///////////////////////
var $beersDiv = $("<div class='beers'></div>");
$("#container").append($beersDiv);
var beersObj = {};
var beerCount = 0;
var pouring = false;
// create beer when space bar is down
function createBeer() {
  if (!pouring) {
    //add the glass for the beer
    var $glass = $("<div class='glass'></div>");
    var $beerDiv = $("<div class='beer'></div>");
    //do i really need this id if I have an object?
    $beerDiv.attr("id", "data-beer-index" + beerCount);
    // position the beer next to the bartender
    $beerDiv.css("left", "472px");
    currentYbartender = $bartenderDiv.css("top");
    currentYbartender = parseInt(currentYbartender);
    $beerDiv.css("top", currentYbartender + "px");
    $("#container").append($beerDiv); //this
    $beerDiv.append($glass);

    //beer object
    var beerObj = {};
    beerObj.id = "data-beer-index" + beerCount;
    beerObj.beer = $beerDiv;
    beerObj.glass = $glass;
    beerObj.endOfBar = false;
    beerObj.movingToCustomer = false; //will be false upon creation
    beerObj.movingToBartender = false; //need to check for both directions
    beerObj.barRow = 0; //this will change
    beersObj[beerCount] = beerObj;
  }
}

/// get the beers per row
function getBeers(row) {
  // filter through the beers object to find the
  //beers  on a given row
}
//check if the customer gets a beer
//check if the beer reaches the left of the bar
//check if the beer glass reaches the right of the bar

// TO DO : The beers will collide with several customers
//var intId = setInterval(beersServed, 100);//this will go in get beers
var beerPosition = 0;
var cutomerPosition = 0;
//on enterframe
// function beersServed() {
//   // loop through the beers
//   for (var beer in beersObj) {
//     // set the position
//     beerPosition = beersObj[beer].beer.css("left");
//     // loop through the customers
//     for (var customer in customersObj) {
//       cutomerPosition = customersObj[customer].element.css("left");
//       //test for collision
//       if (beerPosition < cutomerPosition + 40) {
//         //console.log(" WE HAVE COLLISION " + beerPosition, cutomerPosition);
//       }
//     }
//   }
// }
/////////////////////////////////////////// SET INTERVAL - COLLISONS ///////////
/// set an interval to constantly test for collison
//var intId = setInterval(counter, 100);
// var $beerPosition = 700;
// var $customerPosition;
// //var beerIsBeingSent = false;
// function counter() {
//   $beerPosition = $beerDiv.position();
//   //$customerPosition = $customer.position(); // HELP!!!
//   //if customer and beer collide
//   // 40 is the width of the customer // how can i grab that value?
//   if (beerIsBeingSent) {
//     // change this to check per beer???
//     if ($beerPosition.left < $customerPosition.left + 40) {
//       //console.log("WE HAVE COLLIDED!");
//       clearInterval(intId);
//       // this is where the customer will drink the beer
//       // for now just remove the beer
//       //beersObj[beerCount].movingToCustomer = true;
//       //$beer.remove();
//       // TO DO: the beer cannot dissappear it needs to move right
//       // and change the direction of the customer to go back to the left/..door
//       //stop the customer animation
//       // stop , finish , clearque
//       $customer.stop();
//       customerStopMoving();
//     }
//   }
// }
//}

/////////////////////////////////////////// BARTENDER /////////////////
// A purple square for bartender
var $bartenderDiv = $("<div id='bartender'></div>");
$("#container").append($bartenderDiv);
// positions for controlling bartender
var BARTENDER_HEIGHT = 80;
var BARTENDER_START_Y = 60;
var BARTENDER_START_X = 500;
$bartenderDiv.css("top", BARTENDER_START_Y + "px");
$bartenderDiv.css("left", BARTENDER_START_X + "px");
var currentYbartender = 0;
var newYbartender = 0;
var currentXbartender = 0;
var newXbartender = 0;
/////////////////////////////////////////// POINTS AND LIVES /////////
// Add points display
var points = 0;
var $pointsDiv = $("<div id='points'></div>");
$pointsDiv.append(points);
$("#container").append($pointsDiv);

var lives = 3;
function createLives() {
  // create a div to hold the lives
  var $lives = $("<div id='lives'></div>");
  $("#container").append($lives);
  for (var i = 0; i < lives; i++) {
    //create a beer per life
    var $beerDiv = $("<div class='beer'></div>");
    $beerDiv.attr("id", "data-lives-index" + i);
    // position the lives beers with next position
    var nextPosition = 30 * i;
    $beerDiv.css("left", nextPosition + "px");
    $lives.append($beerDiv);
  }
}
createLives();
/////////////////////////////////////////// KEY DOWN /////////////////
$("body").on("keydown", function(evt) {
  // get the current x and y of bartender
  currentYbartender = $bartenderDiv.css("top");
  currentYbartender = parseInt(currentYbartender);
  currentXbartender = $bartenderDiv.css("left");
  currentXbartender = parseInt(currentXbartender);

  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: /////////// SPACEBAR //////////////////////////////
      if (!pouring) {
        // create beer object and DOM element
        createBeer();
        pouring = true;
        // pouring the beer into the glass
        beersObj[beerCount].glass.animate({ height: "-=30" }, 1000, function() {
          // animation complete - beer is full
          beersObj[beerCount].beer.css("display", "block");
          // move the beer across the bar
          beersObj[beerCount].beer.animate({ left: "-=460" }, 10000);
          beersObj[beerCount].movingToCustomer = true;
          // now its ok to pour another beer
          pouring = false;
          beerCount++;
        });
      }
      // jump back to tap by pouring (space bar)
      $bartenderDiv.css("left", BARTENDER_START_X + "px");
      break;
    case 37: //left key LEFT //////////////////////////////
    case 65: //   a key LEFT //////////////////////////////
      newXbartender = currentXbartender - 5;
      // restrict from moving past the left of bar
      if (newXbartender < BAR_PADDING) {
        newXbartender = BAR_PADDING;
      }
      newXbartender += "px";
      $bartenderDiv.css("left", newXbartender);
      // TO DO : catch a beer glass
      break;
    case 39: // right key RIGHT //////////////////////////////
    case 83: //     s key RIGHT //////////////////////////////
      newXbartender = currentXbartender + 5;
      // restrict from moving past the right
      if (newXbartender > BARTENDER_START_X) {
        newXbartender = BARTENDER_START_X;
      }
      newXbartender += "px";
      $bartenderDiv.css("left", newXbartender);
      break;
    case 13: //return key UP //////////////////////////////
    case 20: //  caps key UP //////////////////////////////
    case 38: //     arrow UP //////////////////////////////
      newYbartender = currentYbartender - BAR_PADDING - BARTENDER_HEIGHT / 2;

      // loop around from the top to the bottom
      if (newYbartender < BARTENDER_START_Y) {
        newYbartender =
          BARTENDER_START_Y + BAR_PADDING * BARS_AMOUNT + BARTENDER_HEIGHT / 2;
      }
      // set the y position of bartender
      newYbartender += "px";
      $bartenderDiv.css("top", newYbartender);
      // set the x position of the bartender
      $bartenderDiv.css("left", BARTENDER_START_X);
      // TO DO : stop pouring by moving to another row
      break;
    case 16: // shift DOWN //////////////////////////////
    case 40: // arrow DOWN //////////////////////////////
      newYbartender = currentYbartender + BAR_PADDING + BARTENDER_HEIGHT / 2;

      // loop around from the bottom to the top and from the top to the bottom
      var downLimit =
        BARTENDER_START_Y +
        BAR_PADDING * (BARS_AMOUNT + 1) +
        BARTENDER_HEIGHT / 2;
      if (newYbartender >= downLimit) {
        newYbartender = BARTENDER_START_Y;
      }
      // set the y position of bartender
      newYbartender += "px";
      $bartenderDiv.css("top", newYbartender);
      // set the x position of the bartender
      $bartenderDiv.css("left", BARTENDER_START_X);
      // TO DO : stop pouring by moving to another row
      break;
    default:
      break;
  }
});
/////////////////////////////////////////// KEY UP /////////////////
$("body").on("keyup", function(evt) {
  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: //spacebar
      if (pouring) {
        pouring = false;
        // stop pouring the beer into the glass
        beersObj[beerCount].beer.css("display", "none");
        beersObj[beerCount].beer.css("height", "30px");
        beersObj[beerCount].glass.stop();
      }
      break;
    default:
      break;
  }
});
