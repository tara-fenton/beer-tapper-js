import Bar from "./Bar.js";
import Bartender from "./Bartender.js";
import Beer from "./Beer.js";
import Customer from "./Customer.js";
import GameOver from "./GameOver.js";
import GetReady from "./GetReady.js";
import Level from "./Level.js";
import Points from "./Points.js";

const $containerDiv = $("body").append("<div id='container'></div>");

const bar = new Bar();
bar.setup();

const $bartenderDiv = $("<div id='bartender'></div>");
$("#container").append($bartenderDiv);

const $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);

// const getReady = new GetReady();
// getReady.setup();

// const gameOver = new GameOver();
// gameOver.setup();

const $levelDiv = $("<div id='level'></div>");
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
let beerPositionX = 0;
let beerPositionY = 0;
let customerPositionX = 0;
let customerPositionY = 0;
//// GET BEERS - SET INTERVAL
// interval used to test for when the beer is moving
let beerInterval = setInterval(getBeers, 500);
/// get the beers per row
function getBeers() {
  // for each beer
  for (let beer in beers) {
    //check if the beer is moving to the customer
    if (beers[beer]._beer.movingToCustomer) {
      // get the current position of the beer
      beerPositionX = parseInt(beers[beer]._beer.beer.css("left"));
      beerPositionY = parseInt(beers[beer]._beer.beer.css("top"));
      // for each customer
      for (let customer in customers) {
        if (customers[customer]._customer.movingForward) {
          // get the current position of the customer
          // console.log(customers[customer]._customer.movingForward);
          // console.log(parseInt(customers[customer]._customer.element.css("left")));
          customerPositionX = parseInt(customers[customer]._customer.element.css("left"));
          customerPositionY = parseInt(customers[customer]._customer.element.css("top"));
          console.log(customerPositionX);
          // check if the y positions of the beer and customer match
          // and check if the beer and customer collided
          // check if the customer gets a beer
          if (beerPositionY === customerPositionY &&
             customerPositionX + 40 > beerPositionX) {
            beers[beer]._beer.movingToCustomer = false;
            beers[beer]._beer.drinking = true;
            customers[customer]._customer.movingForward = false;
            // TO DO : drink the beer
            // change the beer back to a glass
            beers[beer]._beer.glass.css("height", "30");
            // stop the beer and customer animations
            beers[beer]._beer.beer.stop();
            customers[customer]._customer.element.stop();
            // ADD POINTS
            // 50 Points for each saloon patron you send off his aisle
            addPoints(50);

            //customers[customer]._customer.drinking = true;
            //customerMovingBackToDoor(customers[customer]._customer);
          }
        } else {
          // check if the beer reaches the left of the bar
          // without customer to drink the beer
          if (beerPositionX < 100 && beers[beer]._beer.movingToCustomer && !beers[beer]._beer.movingToBartender) {
            //die
            //killTheBartender();
          }
        }
      }
    }
    // check if the beer is being drunk
    // if (beers[beer]._beer.drinking) {
    //   // TO DO : drinking animation
    //   beers[beer]._beer.drinking = false;
    //   beers[beer]._beer.movingToBartender = true;
    //   //send the glass of beer back to bartender
    //   beers[beer]._beer.beer.animate({ left: "+=460" }, 30000);
    // }
    // // check if the beer glass is being send back to bartender
    // if (beers[beer]._beer.movingToBartender) {
    //   // get the current position of the beer
    //   beerPositionX = parseInt(beers[beer]._beer.beer.css("left"));
    //   beerPositionY = parseInt(beers[beer]._beer.beer.css("top"));
    //   // get the current x and y of bartender
    //   currentYbartender = parseInt($bartenderDiv.css("top"));
    //   currentXbartender = parseInt($bartenderDiv.css("left"));
    //   //check for collision with the bartender
    //   if (beerPositionY === currentYbartender &&
    //          beerPositionX + 15 > currentXbartender) {
    //     //remove the glass of beer
    //     beers[beer]._beer.beer.stop();
    //     beers[beer]._beer.beer.remove();
    //     beers[beer]._beer.movingToBartender = false;
    //     // 100 Points for each empty mug you pick up
    //     beers[beer]._beer.collected = true;
    //     addPoints(100);
    //
    //   }
    //   //check if the beer glass reaches the right of the bar
    //   //if the glass reaches the end kill the bartender
    //   if (beerPositionX > BAR_PADDING + BAR_WIDTH) {
    //     //die
    //     killTheBartender();
    //   }
    // }
  }
}

//// GET CUSTOMER COLLISONS - SET INTERVAL
// interval used to test for when all customers are served
let customerInterval = setInterval(getCustomers, 500);
function getCustomers() {
  // set the total customers to the number of customer objects
  // let totalCustomers = Object.keys(customers).length;
  // // will reset each time getCustomer interval is triggered
  // let countCustomersReturning = 0;
  // // for each customer
  // for (let c = 0; c < totalCustomers; c++) {
  //   //check if they are moving back
  //   if(!customers[c]._customer.movingForward) {
  //     console.log("totalCustomers",customers[c]);
  //     //cuz they have to be moving back to door
  //     countCustomersReturning++;
  //     // check if they are at the door
  //     // if (parseInt(customers[c]._customer.element.css('left')) < CUSTOMER_START_Y - CUSTOMER_WIDTH) {
  //     if (parseInt(customers[c]._customer.element.css('left')) < 100 - 40) {
  //       customers[c]._customer.element.css('display', 'none');
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
  // totalBeers = Object.keys(beers).length;
  // countBeersCollected = 0;
  //
  // if (checkForBeers) {
  //   // for each beer
    // for (let b = 0; b < Object.keys(beers).length; b++) {
    //   // check if all glasses are collected
    //   if(beers[b].collected) {
    //     countBeersCollected++
    //   }
    // }
    // // ALL BEERS WERE COLLECTED - LEVEL WON!
    //  if (countBeersCollected === totalBeers && totalBeers > 0) {
    // //if (countBeersCollected === totalBeers) {
    //   levelWon = true;
    // } else {
    //   countBeersCollected = 0;
    // }
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

  let keyPressed = event.which;
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
            beers[beerCount]._beer.movingToCustomer = true;
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
  let downLimit =
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
  let keyPressed = event.which;
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
