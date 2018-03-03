var $containerDiv = $("body").append("<div id='container'></div>");
/////////////////////////////////////////// BAR ///////////////////////
var bars = 4;
var barPadding = 80;

// Create four rows and four taps
function createBarElements() {
  for (var i = 0; i < bars; i++) {
    var $barDiv = $("<div class='bar'></div>");
    $("#container").append($barDiv);
    $barDiv.attr("id", "data-bar-index" + i);
    $barDiv.css("left", barPadding + "px");
    $barDiv.css("top", barPadding * i + barPadding + "px");
  }
}
createBarElements();
/////////////////////////////////////////// CUSTOMERS ///////////////////////
var customersObj = {};
var customersAmount = 4;
var customerHeight = 80;
var $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);

// Create a customer per bar row
function createCustomers() {
  for (var i = 0; i < customersAmount; i++) {
    var $customerDiv = $("<div class='customer'></div>");
    $customersDiv.append($customerDiv);
    $customerDiv.attr("id", "data-customer-index" + i);
    $customerDiv.css("top", customerHeight / 2 * i + "px");
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
  console.log(customersObj);
}
createCustomers();
/// get the customers per row
function getCustomers(row) {
  // filter through the customers object to find the
  //customers on a given row
}
//move the customer across the bar towards the bartender
$("body").ready(customerMoving);
function customerMoving() {
  $(".customer").animate({ left: "+=410" }, 10000, function() {
    // Animation complete.
    // ** the customer reached the end of the bar // kill the bartender
  });
  for (var customer in customersObj) {
    console.log("OBJ. " + customersObj[customer].barRow);
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
var beersObj = {};
var beerCount = 0;
var pouring = false;
var $beersDiv = $("<div class='beers'></div>");
$("#container").append($beersDiv);
// TO DO: need to make more than one beer be sent
function createBeer() {
  if (!pouring) {
    //pouring = true;pouring = true;
    //add the glass for the beer
    var $glass = $("<div class='glass'></div>");
    var $beerDiv = $("<div class='beer'></div>");
    $beerDiv.attr("id", "data-beer-index" + beerCount);
    $beerDiv.css("left", "500px");
    currentYbartender = $bartenderDiv.css("top");
    currentYbartender = parseInt(currentYbartender);
    console.log(" currentYbartender " + currentYbartender);
    $beerDiv.css("top", currentYbartender + "px");
    console.log();
    $("#container").append($beerDiv);
    $beerDiv.append($glass);

    //beer object
    var beerObj = {};
    beerObj.id = "data-beer-index" + beerCount;
    //beerObj.
    beerObj.endOfBar = false;
    beerObj.element = $beerDiv;
    beerObj.glass = $glass;

    beerObj.movingToCustomer = false; //will be false upon creation
    beerObj.movingToBartender = false; //need to check for both directions
    beerObj.barRow = 0; //this will change
    beersObj[beerCount] = beerObj;
    //console.log(beersObj[beerCount]);
    console.log(beerObj.element);
  }

  //return $beerDiv;
}

/// get the beers per row
function getBeers(row) {
  // filter through the beers object to find the
  //beers  on a given row
}

//move the beer across the bar
//function sendTheBeer() {

//}

function stopFillTheBeer() {}

// TO DO : The beers will collide with several customers
function beersServed() {
  // maybe this will be counter function
}
/////////////////////////////////////////// SET INTERVAL - COLLISONS ///////////
/// set an interval to constantly test for collison
var count = 0;
//var intId = setInterval(counter, 100);
var $beerPosition = 700;
var $customerPosition;
//var beerIsBeingSent = false;
function counter() {
  $beerPosition = $beerDiv.position();
  //$customerPosition = $customer.position(); // HELP!!!
  //if customer and beer collide
  // 40 is the width of the customer // how can i grab that value?
  if (beerIsBeingSent) {
    // change this to check per beer???
    if ($beerPosition.left < $customerPosition.left + 40) {
      //console.log("WE HAVE COLLIDED!");
      clearInterval(intId);
      // this is where the customer will drink the beer
      // for now just remove the beer
      //beersObj[beerCount].movingToCustomer = true;
      //$beer.remove();
      // TO DO: the beer cannot dissappear it needs to move right
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
    case 32: /////////// SPACEBAR //////////////////////////////
      if (!pouring) {
        createBeer();
        pouring = true;
        //$beer.css("display", "block");

        //pouring the beer into the glass
        beersObj[beerCount].glass.animate({ height: "-=30" }, 1000, function() {
          //once the beer is full
          beersObj[beerCount].element.css("display", "block");
          beersObj[beerCount].element.animate({ left: "-=460" }, 10000);
          beersObj[beerCount].movingToCustomer = true;
          pouring = false;
          beerCount++; //now its ok to pour another beer
          //sendTheBeer();
        });
      }
      // jump back to tap by pouring (space bar)
      $bartenderDiv.css("left", bartenderXstart + "px");
      break;
    case 37: //left key LEFT //////////////////////////////
    case 65: //   a key LEFT //////////////////////////////
      newXbartender = currentXbartender - 5;
      // restrict from moving past the left of bar
      if (newXbartender < barPadding) {
        newXbartender = barPadding;
      }
      newXbartender += "px";
      $bartenderDiv.css("left", newXbartender);
      // TO DO : catch a beer glass
      break;
    case 39: // right key RIGHT //////////////////////////////
    case 83: //     s key RIGHT //////////////////////////////
      newXbartender = currentXbartender + 5;
      // restrict from moving past the tap
      if (newXbartender > bartenderXstart) {
        newXbartender = bartenderXstart;
      }
      newXbartender += "px";
      $bartenderDiv.css("left", newXbartender);
      break;
    case 13: //return key UP //////////////////////////////
    case 20: //  caps key UP //////////////////////////////
    case 38: //     arrow UP //////////////////////////////
      newYbartender = currentYbartender - barPadding - bartenderHeight / 2;

      // loop around from the top to the bottom
      if (newYbartender < bartenderYstart) {
        newYbartender =
          bartenderYstart + barPadding * bars + bartenderHeight / 2;
      }
      // set the y position of bartender
      newYbartender += "px";
      $bartenderDiv.css("top", newYbartender);
      // set the x position of the bartender
      $bartenderDiv.css("left", bartenderXstart);
      // TO DO : stop pouring by moving to another row
      break;
    case 16: // shift DOWN //////////////////////////////
    case 40: // arrow DOWN //////////////////////////////
      newYbartender = currentYbartender + barPadding + bartenderHeight / 2;

      // loop around from the bottom to the top and from the top to the bottom
      var downLimit =
        bartenderYstart + barPadding * (bars + 1) + bartenderHeight / 2;
      if (newYbartender >= downLimit) {
        newYbartender = bartenderYstart;
      }
      // set the y position of bartender
      newYbartender += "px";
      $bartenderDiv.css("top", newYbartender);
      // set the x position of the bartender
      $bartenderDiv.css("left", bartenderXstart);
      // TO DO : stop pouring by moving to another row
      break;
    default:
      //console.log(keyPressed);
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
        //$beer.css("display", "none");
        //pouring the beer into the glass
        beersObj[beerCount].element.css("display", "none");
        beersObj[beerCount].glass.stop();
        beersObj[beerCount].element.css("height", "30px");
        //$(".glass").css("height", "30px");
        //$(".glass").stop();
      }
      break;
    default:
      //console.log(keyPressed);
      break;
  }
});
