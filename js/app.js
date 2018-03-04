/////////////////////////////////////////// BAR ///////////////////////
var $containerDiv = $("body").append("<div id='container'></div>");
var BARS_AMOUNT = 4;
var BAR_PADDING = 80;
var BAR_WIDTH = 400;
// Create four rows
// TO DO : and four taps and four doors
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
//// CUSTOMER DISPLAY
var $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);
var CUSTOMER_AMOUNT = 4;
var CUSTOMER_HEIGHT = 80;
var customersObj = {};

//// CREATE CUSTOMER
var CUSTOMER_START_Y = 60;
// Create a customer per bar row
function createCustomers() {
  for (var i = 0; i < CUSTOMER_AMOUNT; i++) {
    var $customerDiv = $("<div class='customer'></div>");
    $customersDiv.append($customerDiv);
    $customerDiv.attr("id", "data-customer-index" + i);
    $customerDiv.css("top", + (CUSTOMER_HEIGHT / 2 + BAR_PADDING) * i + CUSTOMER_START_Y +"px");
    $customerDiv.css("left", "30px");
    // customer object
    var customerObj = {};
    customerObj.id = "data-customer-index" + i;
    customerObj.element = $customerDiv;
    customerObj.movingForward = true;
    //customerObj.drinking = false;
    customerObj.barRow = i;
    customersObj[i] = customerObj;
    //customerObj.startTime = setTimeout(customerMoving(i), 30000 * i); // something random
    // TO DO : fix the speed of the customers coming out
    setTimeout(customerMovingToBartender(i), 30000 * i); // something random
  }
}

createCustomers();

//// CUSTOMER COLLISONS
var beerPosition = 0;
var cutomerPosition = 0;

//// MOVE THE CUSTOMER TO BARTENDER - ANIMATION
// triggered in createCustomers
// move the customer across the bar towards the bartender
function customerMovingToBartender(current) {
  customersObj[current].element.animate(
    { left: "+=420" },
    10000 * (current + 1), //this is where time is set
    //1000 * (test + 1), //fast cutomers for testing
    function() {
      //// KILL THE BARTENDER, CUSTOMER AT END OF BAR
      killTheBartender();
    }
  );
}
//// KILL THE BARTENDER
function killTheBartender(){
  clearInterval(beerInterval);
  //// STOP THE CUSTOMERS
  for (var customer in customersObj) {
    customersObj[customer].element.stop();

    //customersObj[customer].element.remove();
  }

  //clear the object to start fresh
  //customersObj = {}; do this in end life
  //// STOP THE BEERS
  for (var beer in beersObj) {
    beersObj[beer].beer.stop();
    //reset to stop conditionals
    beersObj[beer].beer.movingToCustomer = false; //will be false upon creation
    beersObj[beer].beer.movingToBartender = false;
  }
  //beersObj = {}
  // loose a life
  setTimeout(lifeLost, 3000);
}
//// MOVE THE CUSTOMER BACK TO DOOR - ANIMATION
// triggered in getBeers
// move the customer across the bar towards the door
function customerMovingBackToDoor(currentCustomer, currentBeer) {
  currentCustomer.element.css("backgroundColor", "green");
  currentCustomer.element.animate({ left: "-=420" },10000);
}

/////////////////////////////////////////// BEER ///////////////////////
//// BEER DISPLAY
var $beersDiv = $("<div class='beers'></div>");
$("#container").append($beersDiv);
var beersObj = {};
var beerCount = 0;
var pouring = false;

//// CREATE BEER
// Create a beer when space bar is down
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
    beerObj.drinking = false;
    beerObj.movingToCustomer = false; //will be false upon creation
    beerObj.movingToBartender = false; //need to check for both directions
    beerObj.barRow = 0; //this will change
    beersObj[beerCount] = beerObj;
  }
}
//// GET BEERS - SET INTERVAL
// Get the positions for testing collisons
var beerPositionX = 0;
var beerPositionY = 0;
var cutomerPositionX = 0;
var cutomerPositionY = 0;
var beerInterval = setInterval(getBeers, 500);
/// get the beers per row
function getBeers() {
  // for each beer
  for (var beer in beersObj) {
    //check if the beer is moving to the customer
    if (beersObj[beer].movingToCustomer) {
      // get the current position of the beer
      beerPositionX = parseInt(beersObj[beer].beer.css("left"));
      beerPositionY = parseInt(beersObj[beer].beer.css("top"));
      // for each customer
      for (var customer in customersObj) {
        if (customersObj[customer].movingForward) {
          // get the current position of the customer
          customerPositionX = parseInt(customersObj[customer].element.css("left"));
          customerPositionY = parseInt(customersObj[customer].element.css("top"));
          // check if the y positions of the beer and customer match
          // and check if the beer and customer collided
          // check if the customer gets a beer
          if (beerPositionY === customerPositionY &&
             customerPositionX + 40 > beerPositionX) {
            // stop the beer and customer animations
            beersObj[beer].beer.stop();
            customersObj[customer].element.stop();
            // add points
            points += 50;
            $pointsDiv.text(points);
            beersObj[beer].movingToCustomer = false;
            beersObj[beer].drinking = true;
            customersObj[customer].movingForward = false;
            //customersObj[customer].drinking = true;
            customerMovingBackToDoor(customersObj[customer], beersObj[beer])
          }
        } else {
          // check if the beer reaches the left of the bar
          // without customer to drink the beer
          if (beerPositionX < 100) {
            //die
            killTheBartender();
          }
        }
      }
    }
    // check if the beer is being drunk
    if (beersObj[beer].drinking) {
      console.log("drinking")
      beersObj[beer].drinking = false;
      beersObj[beer].movingToBartender = true;
      //send the glass of beer back
      beersObj[beer].beer.animate({ left: "+=460" }, 30000);
    }
    // check if the beer glass is being send back to bartender
    if (beersObj[beer].movingToBartender) {
      // get the current position of the beer
      beerPositionX = parseInt(beersObj[beer].beer.css("left"));
      beerPositionY = parseInt(beersObj[beer].beer.css("top"));
      // get the current x and y of bartender
      currentYbartender = $bartenderDiv.css("top");
      currentYbartender = parseInt(currentYbartender);
      currentXbartender = $bartenderDiv.css("left");
      currentXbartender = parseInt(currentXbartender);
      //check for collision with the bartender
      if (beerPositionY === currentYbartender &&
             beerPositionX > currentXbartender) {
        //remove the glass of beer
        beersObj[beer].beer.stop();
        beersObj[beer].beer.remove();
        beersObj[beer].movingToBartender = false;
        // 100 Points for each empty mug you pick up
        points += 100;
        $pointsDiv.text(points);

      }
      //check if the beer glass reaches the right of the bar
      //if the glass reaches the end kill the bartender
      if (beerPositionX > BAR_PADDING + BAR_WIDTH) {
        //die
        killTheBartender();
      }
    }
  }
}
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
          //// BEER IS FULL, ANIMATION COMPLETE
          beersObj[beerCount].beer.css("display", "block");
          // move the beer across the bar
          // TO DO : INTERVAL TO CHECK IF BEER HITS COSTUMER
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
/////////////////////////////////////////// POINTS ///////////////////
// Add points display
var points = 0;
var $pointsDiv = $("<div id='points'></div>");
$pointsDiv.append(points);
$("#container").append($pointsDiv);
// 50 Points for each saloon patron you send off his aisle
// 1500 Points for each tip you pick up
// 1000 Points for completing a level
// Bonus Level 3000 Points for getting the bonus level right
///////////////////////////////////////////  lEVEL ///////////////////
var level = 1;
var $levelDiv = $("<div id='level'></div>");
$levelDiv.append(level);
$("#container").append($levelDiv);
///////////////////////////////////////////  LIVES ///////////////////
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

function lifeLost() {
  lives--;
  if (lives > 0) {
    nextLife();
  } else {
    endGame();
  }
}
function nextLife() {
  // create life lost screen
  var $lifeLost = $("<div id='lifeLost'></div>");
  $lifeLost.append("<h1>get ready to serve</h1>");
  $("#container").append($lifeLost);

  for (var customer in customersObj) {
    //customersObj[customer].element.stop();
    customersObj[customer].element.remove();
  }

  //clear the object to start fresh
  customersObj = {};

  for (var beer in beersObj) {
    //customersObj[customer].element.stop();
    beersObj[beer].beer.remove();
  }

  //clear the object to start fresh
  beersObj = {};

  // set a timeout to remove life lost screen
  setTimeout(removeDiv, 3000);
  function removeDiv() {
    $lifeLost.remove();
    // create customers for new round
    createCustomers();
    // reset the beer interval
    beerInterval = setInterval(getBeers, 500);
  }
}
/////////////////////////////////////////// END GAME /////////////////
function endGame() {
  var $end = $("<div id='end'></div>");
  $end.append("<h1>GAME OVER</h1>");
  $end.append("<button>insert quarter</button>");
  $("#container").append($end);
}
