import Bar from "./Bar.js";
import Bartender from "./Bartender.js";
import Beer from "./Beer.js";
import Customer from "./Customer.js";
import GameOver from "./GameOver.js";
import GetReady from "./GetReady.js";
import Level from "./Level.js";
import Points from "./Points.js";

var $containerDiv = $("body").append("<div id='container'></div>");

const bar = new Bar();
bar.setup();

var $bartenderDiv = $("<div id='bartender'></div>");
$("#container").append($bartenderDiv);

var $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);

// const getReady = new GetReady();
// getReady.setup();

// const gameOver = new GameOver();
// gameOver.setup();

var $levelDiv = $("<div id='level'></div>");
$("#container").append($levelDiv);

const level = new Level();
console.log(level._level);
$("#level").append(toString(level._level));
// $("#level").append(String(level._level));
//level.setup();
// console.log(typeof level._level);
// $levelDiv.append(Level.level);
const points = new Points();
// points.setup();
const $pointsDiv = $("<div id='points'></div>");
$("#container").append($pointsDiv);
$pointsDiv.append(points._amount);

function addPoints(add) {
  points._amount += add;
  $pointsDiv.text(points._amount);
}
// addPoints(100); //TODO: use this function when points need to be added
const bartender = new Bartender();
bartender.setup();

const customers = [];
function makeCustomers() {
  for (let i = 0; i < 4; i++) {
    const customer = new Customer(i, bar);
    customer.setup();
    customers.push(customer);
    setTimeout(customer.customerMovingToBartender(i), 30000); // something random
  }
}
makeCustomers();

console.log(customers);

let beers = [];
let beerCount = 0;
let pouring = false;
let pouringSent = false;
function makeBeer() {
  const beer = new Beer(beerCount, bartender);
  beer.setup();
  beers.push(beer);
}

//// GET CUSTOMER COLLISONS - SET INTERVAL
// interval used to test for when all customers are served
var customerInterval = setInterval(getCustomers, 500);
function getCustomers() {
  // set the total customers to the number of customer objects
  // let totalCustomers = Object.keys(customers).length;
  // // will reset each time getCustomer interval is triggered
  // let countCustomersReturning = 0;
  // // for each customer
  // for (var c = 0; c < totalCustomers; c++) {
  //   //check if they are moving back
  //   if(!customers[c].movingForward) {
  //     console.log("totalCustomers",customers[c]);
  //     //cuz they have to be moving back to door
  //     countCustomersReturning++;
  //     // check if they are at the door
  //     // if (parseInt(customers[c]._customer.element.css('left')) < CUSTOMER_START_Y - CUSTOMER_WIDTH) {
  //     if (parseInt(customers[c]._customer.element.css('left')) < 100 - 40) {
  //       customers[c].element.css('display', 'none');
  //     }
  //   }
  // }
  // if (countCustomersReturning === totalCustomers) {
  //   checkForBeers = true;
  // }
  // // else {
  // //   countCustomersReturning = 0;
  // // }
  // // now that all customers are returning
  // // check if all glasses are collected
  // totalBeers = Object.keys(beersObj).length;
  // countBeersCollected = 0;
  //
  // if (checkForBeers) {
  //   // for each beer
  //   for (var b = 0; b < Object.keys(beersObj).length; b++) {
  //     // check if all glasses are collected
  //     if(beersObj[b].collected) {
  //       countBeersCollected++
  //     }
  //   }
  //   // ALL BEERS WERE COLLECTED - LEVEL WON!
  //    if (countBeersCollected === totalBeers && totalBeers > 0) {
  //   //if (countBeersCollected === totalBeers) {
  //     levelWon = true;
  //   } else {
  //     countBeersCollected = 0;
  //   }
  // }
  /// TO DO : make this a function?
  // if (levelWon) {
  //   // ADD POINTS
  //   // 1000 Points for completing a level
  //   points += 1000;
  //   $pointsDiv.text(points);
  //   // ADD LEVEL
  //   level++;
  //   CUSTOMER_AMOUNT = CUSTOMER_AMOUNT * level;
  //   $levelDiv.text(level);
  //   //reset value for next level
  //   levelWon = false;
  //   // clear the beer and customer intervals
  //   clearInterval(beerInterval);
  //   clearInterval(customerInterval);
  //   // NEXT LEVEL
  //   nextLevel();
  // }
}

/////////////////////////////////////////// KEY DOWN /////////////////
$("body").on("keydown", function(evt) {
  // get the current x and y of bartender
  bartender._y = parseInt($bartenderDiv.css("top"));
  bartender._x = parseInt($bartenderDiv.css("left"));

  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: /////////// SPACEBAR //////////////////////////////
      if (!pouring) {
        // create beer object and DOM element
        makeBeer();
        pouring = true;
        // pouring the beer into the glass
        console.log("hello ", beers[beerCount]._beer);
        beers[beerCount]._beer.beer.css("display", "block");
        beers[beerCount]._beer.glass.animate(
          { height: "-=30" },
          700,
          function() {
            //// BEER IS FULL, ANIMATION COMPLETE
            // move the beer across the bar
            beers[beerCount]._beer.beer.animate({ left: "-=460" }, 10000);
            //beers[beerCount].movingToCustomer = true;
            pouringSent = true; // used in key up event
          }
        );
      }
      // jump back to tap by pouring (space bar)
      $bartenderDiv.css("left", bartender._startX + "px");
      break;

    case 37: //left key LEFT //////////////////////////////
    case 65: //   a key LEFT //////////////////////////////
      moveBartenderLeft();
      break;
    case 39: // right key RIGHT //////////////////////////////
    case 83: //     s key RIGHT //////////////////////////////
      moveBartenderRight();
      break;

    case 13: //return key UP //////////////////////////////
    case 20: //  caps key UP //////////////////////////////
    case 38: //     arrow UP //////////////////////////////
      moveBartenderUp();
      break;
    case 16: // shift DOWN //////////////////////////////
    case 40: // arrow DOWN //////////////////////////////
      moveBartenderDown();
      break;
    default:
      break;
  }
});
function moveBartenderLeft() {
  bartender._newX = bartender._x - 5;
  // restrict from moving past the left of bar
  if (bartender._newX < bar._padding) {
    bartender._newX = bar._padding;
  }
  $bartenderDiv.css("left", bartender._newX);
}
function moveBartenderRight() {
  bartender._newX = bartender._x + 5;
  // restrict from moving past the right
  if (bartender._newX > bartender._startX) {
    bartender._newX = bartender._startX;
  }
  $bartenderDiv.css("left", bartender._newX);
}
function moveBartenderUp() {
  bartender._newY = bartender._y - bar._padding - bartender._height / 2;
  // loop around from the top to the bottom
  if (bartender._newY < bartender._startY) {
    bartender._newY =
      bartender._startY +
      bar._padding * bar._amount +
      bartender._height / 2;
  }
  $bartenderDiv.css("top", bartender._newY);
  $bartenderDiv.css("left", bartender._startX);
}
function moveBartenderDown() {
  bartender._newY = bartender._y + bar._padding + bartender._height / 2;
  // loop around from the bottom to the top and from the top to the bottom
  var downLimit =
    bartender._startY +
    bar._padding * (bar._amount + 1) +
    bartender._height / 2;
  if (bartender._newY >= downLimit) {
    bartender._newY = bartender._startY;
  }
  $bartenderDiv.css("top", bartender._newY);
  $bartenderDiv.css("left", bartender._startX);
}
/////////////////////////////////////////// KEY UP /////////////////
$("body").on("keyup", function(evt) {
  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: //spacebar
      // check if the beer is pouring BUT not being sent to customer
      if (pouring && !pouringSent) {
        pouring = false;
        // stop pouring the beer into the glass
        beers[beerCount]._beer.beer.css("display", "none");
        beers[beerCount]._beer.beer.css("height", "30px");
        beers[beerCount]._beer.glass.stop();
      }
      // check if the beer is pouring AND being sent to customer
      if (pouring && pouringSent) {
        // beers.push(beer);
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
