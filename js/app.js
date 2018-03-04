///////////////////////////////////////////  GLOBALS ///////////////////
//create bars
var BARS_AMOUNT = 4;
var BAR_PADDING = 80;
var BAR_WIDTH = 400;
// set level, lives and points
var level = 1;
var lives = 3;
var points = 0;
var levelWon = false;
// create customers
var CUSTOMER_AMOUNT = 4 * level;
var CUSTOMER_HEIGHT = 80;
var CUSTOMER_START_Y = 60;
var customersObj = {};
// create beers
var beersObj = {};
var beerCount = 0;
var pouring = false;
var pouringSent = false;
// positions for controlling bartender
var BARTENDER_HEIGHT = 80;
var BARTENDER_WIDTH = 40;
var BARTENDER_START_Y = 60;
var BARTENDER_START_X = 500;
var currentYbartender = 0;
var newYbartender = 0;
var currentXbartender = 0;
var newXbartender = 0;
// beer positions for collisons
var beerPositionX = 0;
var beerPositionY = 0;
// customer positions for collisions
var cutomerPositionX = 0;
var cutomerPositionY = 0;
// customer collisions
var checkForBeers = false;
var totalCustomers = 0;
var countCustomersReturning = 0;
var totalBeers = 0;
var countBeersCollected = 0;
///////////////////////////////////////////  DISPLAYS ///////////////////
// container div
var $containerDiv = $("body").append("<div id='container'></div>");

createBarElements();

// bartender display
var $bartenderDiv = $("<div id='bartender'></div>");
$bartenderDiv.css("top", BARTENDER_START_Y + "px");
$bartenderDiv.css("left", BARTENDER_START_X + "px");
$("#container").append($bartenderDiv);

// level display
var $levelDiv = $("<div id='level'></div>");
$levelDiv.append(level);
$("#container").append($levelDiv);

// points display
var $pointsDiv = $("<div id='points'></div>");
$pointsDiv.append(points);
$("#container").append($pointsDiv);

// customer display, so they can be "removed"
var $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);


/////////////////////////////////////////// BAR ///////////////////////
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
/////////////////////////////////////////// CUSTOMERS ///////////////////////
//// CREATE CUSTOMER
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
    //setTimeout(customerMovingToBartender(i), 30000 * i); // something random
    setTimeout(customerMovingToBartender(i), 30000 * i); // something random
  }
}

createCustomers();

//// MOVE THE CUSTOMER TO BARTENDER - ANIMATION
// triggered in createCustomers
// move the customer across the bar towards the bartender
function customerMovingToBartender(current) {
  customersObj[current].element.animate(
    { left: "+=420" },
    //10000 * (current + 1), //this is where time is set
    1000 * (current + 1), //fast cutomers for testing
    function() {
      //// KILL THE BARTENDER, CUSTOMER AT END OF BAR
      killTheBartender();
    }
  );
}

//// MOVE THE CUSTOMER BACK TO DOOR - ANIMATION
// triggered in getBeers
// move the customer across the bar towards the door
function customerMovingBackToDoor(currentCustomer) {
  currentCustomer.element.css("backgroundColor", "green");
  currentCustomer.element.animate({ left: "-=420" },10000);
}

//// GET CUSTOMER COLLISONS - SET INTERVAL
// interval used to test for when all customers are served
var customerInterval = setInterval(getCustomers, 500);
function getCustomers() {
  // set the total customers to the number of customer objects
  totalCustomers = Object.keys(customersObj).length;
  // will reset each time getCustomer interval is triggered
  countCustomersReturning = 0;
  // for each customer
  for (var c = 0; c < totalCustomers; c++) {
    //check if they are moving back
    if(!customersObj[c].movingForward) {
      //cuz they have to be moving back to door
      countCustomersReturning++;
    }
  }
  if (countCustomersReturning === totalCustomers) {
    checkForBeers = true;
  }
  // else {
  //   countCustomersReturning = 0;
  // }
  // now that all customers are returning
  // check if all glasses are collected
  totalBeers = Object.keys(beersObj).length;
  countBeersCollected = 0;

  if (checkForBeers) {
    // for each beer
    for (var b = 0; b < Object.keys(beersObj).length; b++) {
      // check if all glasses are collected
      if(beersObj[b].collected) {
        countBeersCollected++
      }
    }
    // for presentation
     console.log(countBeersCollected, totalBeers);
    // ALL BEERS WERE COLLECTED - LEVEL WON!
    // for class
    // if (countBeersCollected === totalBeers && totalBeers > 0) {
    if (countBeersCollected === totalBeers) {
      levelWon = true;
    } else {
      countBeersCollected = 0;
    }
  }
  /// TO DO : make this a function?
  if (levelWon) {
    // ADD POINTS
    // 1000 Points for completing a level
    points += 1000;
    $pointsDiv.text(points);
    // ADD LEVEL
    level++;
    $levelDiv.text(level);
    //reset value for next level
    levelWon = false;
    // clear the beer and customer intervals
    clearInterval(beerInterval);
    clearInterval(customerInterval);
    // NEXT LEVEL
    nextLevel();
  }
}
/////////////////////////////////////////// BEER ///////////////////////
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
    currentYbartender = parseInt($bartenderDiv.css("top"));
    $beerDiv.css("top", currentYbartender + "px");
    $beerDiv.append($glass);
    $("#container").append($beerDiv);

    //beer object
    var beerObj = {};
    beerObj.id = "data-beer-index" + beerCount;
    beerObj.beer = $beerDiv;
    beerObj.glass = $glass;
    beerObj.drinking = false;
    beerObj.movingToCustomer = false; //will be false upon creation
    beerObj.movingToBartender = false; //need to check for both directions
    beerObj.collected = false; //used to check for win level
    //beerObj.barRow = 0; //this will change
    beersObj[beerCount] = beerObj;
  }
}

//// GET BEERS - SET INTERVAL
// interval used to test for when the beer is moving
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
            // TO DO : drink the beer
            // change the beer back to a glass
            beersObj[beer].glass.css("height", "30");
            // stop the beer and customer animations
            beersObj[beer].beer.stop();
            customersObj[customer].element.stop();
            // ADD POINTS
            // 50 Points for each saloon patron you send off his aisle
            points += 50;
            $pointsDiv.text(points);
            beersObj[beer].movingToCustomer = false;
            beersObj[beer].drinking = true;
            customersObj[customer].movingForward = false;
            //customersObj[customer].drinking = true;
            customerMovingBackToDoor(customersObj[customer]);
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
      // TO DO : drinking animation
      beersObj[beer].drinking = false;
      beersObj[beer].movingToBartender = true;
      //send the glass of beer back to bartender
      beersObj[beer].beer.animate({ left: "+=460" }, 30000);
    }
    // check if the beer glass is being send back to bartender
    if (beersObj[beer].movingToBartender) {
      // get the current position of the beer
      beerPositionX = parseInt(beersObj[beer].beer.css("left"));
      beerPositionY = parseInt(beersObj[beer].beer.css("top"));
      // get the current x and y of bartender
      currentYbartender = parseInt($bartenderDiv.css("top"));
      currentXbartender = parseInt($bartenderDiv.css("left"));
      //check for collision with the bartender
      if (beerPositionY === currentYbartender &&
             beerPositionX + 15 > currentXbartender) {
        //remove the glass of beer
        beersObj[beer].beer.stop();
        beersObj[beer].beer.remove();
        beersObj[beer].movingToBartender = false;
        // 100 Points for each empty mug you pick up
        beersObj[beer].collected = true;
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
//// KILL THE BARTENDER
function killTheBartender(){
  clearInterval(beerInterval);
  clearInterval(customerInterval);
  //// STOP THE CUSTOMERS
  for (var customer in customersObj) {
    customersObj[customer].element.stop();
  }
  //// STOP THE BEERS
  for (var beer in beersObj) {
    beersObj[beer].beer.stop();
    //reset to stop conditionals
    beersObj[beer].beer.movingToCustomer = false; //will be false upon creation
    beersObj[beer].beer.movingToBartender = false;
  }
  // loose a life
  setTimeout(lifeLost, 1500);
}
/////////////////////////////////////////// KEY DOWN /////////////////
$("body").on("keydown", function(evt) {
  // get the current x and y of bartender
  currentYbartender = parseInt($bartenderDiv.css("top"));
  currentXbartender = parseInt($bartenderDiv.css("left"));

  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: /////////// SPACEBAR //////////////////////////////
      if (!pouring) {
        // create beer object and DOM element
        createBeer();
        pouring = true;
        // pouring the beer into the glass
        beersObj[beerCount].beer.css("display", "block");
        beersObj[beerCount].glass.animate({ height: "-=30" }, 700, function() {
          //// BEER IS FULL, ANIMATION COMPLETE
          // move the beer across the bar
          beersObj[beerCount].beer.animate({ left: "-=460" }, 10000);
          beersObj[beerCount].movingToCustomer = true;
          pouringSent = true; // used in key up event
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
      // check if the beer is pouring BUT not being sent to customer
      if (pouring && !pouringSent) {
        pouring = false;
        // stop pouring the beer into the glass
        beersObj[beerCount].beer.css("display", "none");
        beersObj[beerCount].beer.css("height", "30px");
        beersObj[beerCount].glass.stop();
      }
      // check if the beer is pouring AND being sent to customer
      if (pouring && pouringSent) {
        // now its ok to add another beer
         beerCount++;
         // reset these values for next beer
         pouring = false;
         pouringSent = false;
      }
    default:
      break;
  }
});
/////////////////////////////////////////// POINTS ///////////////////

// 1500 Points for each tip you pick up
// Bonus Level 3000 Points for getting the bonus level right

///////////////////////////////////////////  LIVES ///////////////////
// create a div to hold the lives
var $lives = $("<div id='lives'></div>");
$("#container").append($lives);
function createLives() {
var $lives = $("<div id='lives'></div>");

$("#container").append($lives);
  console.log("lives in create lives "+lives)
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
function removeLives() {
  for (var i = 0; i < lives; i++) {
    $("data-lives-index" + i).remove();
  }
}
///////////////////////////////////////////  LIFE LOST ///////////////////
function lifeLost() {
  // for presentation
  // console.log('lifeLost')
  $lives.remove();
  removeLives();
  lives--;
  console.log("lives "+lives)
  createLives();
  if (lives > 0) {
    nextLevel();
  } else {
    endGame();
  }
}
///////////////////////////////////////////  NEXT LEVEL ///////////////////
function nextLevel() {
  //for presentation
  //console.log('nextLevel')

  // create ready to serve screen
  var $readyToServe = $("<div id='readyToServe'></div>");
  $readyToServe.append("<h1>get ready to serve</h1>");
  $("#container").append($readyToServe);

  removeObjects();

  // set a timeout to remove ready to serve screen
  setTimeout(removeDiv, 2000);
  function removeDiv() {
    $readyToServe.remove();
    newLevel();
  }
}
function removeObjects(){
  // remove the customer elements
  for (var customer in customersObj) {
    customersObj[customer].element.remove();
  }
  //clear the object to start fresh
  customersObj = {};
  // remove the beer elements
  for (var beer in beersObj) {
    beersObj[beer].beer.remove();
  }
  //clear the object to start fresh
  beersObj = {};
  //reset the beer count
  beerCount = 0;
  // bartender to start at the left
  $bartenderDiv.css("left", BARTENDER_START_X + "px");
}
function newLevel() {
  // create customers for new level/game
  createCustomers();
  // reset the beer and customer intervals
  beerInterval = setInterval(getBeers, 500);
  customerInterval = setInterval(getCustomers, 500);
}
/////////////////////////////////////////// END GAME /////////////////

function endGame() {
  var $end = $("<div id='end'></div>");
  $end.append("<h1>GAME OVER</h1>");
  $resetGame = $("<button id='resetGame'>insert quarter</button>");
  $end.append($resetGame);
  $("#container").append($end);

  $resetGame.on('click', function resetGame() {
  console.log("rest game");
  $end.remove();
  lives = 3;
  level = 1;
  removeObjects();
  newLevel();
});
}

