import Bar from "./Bar.js";
import Bartender from "./Bartender.js";
import Beer from "./Beer.js";
import Customer from "./Customer.js";
import GameOver from "./GameOver.js";
import GetReady from "./GetReady.js";
import HighScoreForm from "./HighScoreForm.js";
import Level from "./Level.js";
import Lives from "./Lives.js";
import Points from "./Points.js";
import StartGame from "./StartGame.js";

const $containerDiv = $("body").append("<div id='container'></div>");

const bar = new Bar();
bar.setup();

const $bartenderDiv = $("<div id='bartender'></div>");
$("#container").append($bartenderDiv);

const $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);

const lives = new Lives();
lives.setup();

const $levelDiv = $("<div id='level'></div>");
$("#container").append($levelDiv);

const level = new Level();
$("#level").append(level._level);

const points = new Points();
const $pointsDiv = $("<div id='points'></div>");
$("#container").append($pointsDiv);
$pointsDiv.append(points._amount);
// points._amount += 500;
// $pointsDiv.append(500);

const bartender = new Bartender();
bartender.setup();

let customers;
function makeCustomers() {
  customers = [];
  for (let i = 0; i < 4; i++) {
    const customer = new Customer(i, bar);
    customer.setup();
    customers.push(customer);

    setTimeout(customerMovingToBartender(customer._customer, i), 30000); // something random
  }
}

const startGame = new StartGame();
startGame.setup();

const getReady = new GetReady();
const highScoreForm = new HighScoreForm();
const gameOver = new GameOver();

$("#startButton").on("click", function() {
  $("#readyToServe").remove();
  startRound();
});

// $("#instructionsButton").on('click', function() {
//   console.log('instructions clicked');
//   startGame.instructions();
// })

let gameInterval;
function startRound() {
  setBeerProps();
  makeCustomers();
  gameInterval = setInterval(beersAndCustomersCollisions, 500);
}
let beers;
let beerCount;
let pouring;
let pouringSent;

function setBeerProps() {
  beers = [];
  beerCount = 0;
  pouring = false;
  pouringSent = false;
}

function makeBeer() {
  const beer = new Beer(beerCount, bartender);
  beer.setup();
  beers.push(beer);
}

let beerPositionX = 0;
let beerPositionY = 0;
let customerPositionX = 0;
let customerPositionY = 0;
let currentYbartender = 0;
let currentXbartender = 0;

function beersAndCustomersCollisions() {
  for (let beer in beers) {


    if (beers[beer]._beer.movingToCustomer) {
      // for each customer
      for (let customer in customers) {
        getBeerPostion(beer);
        getCustomerPostion(customer);
        if (customers[customer]._customer.movingForward) {
          checkForServe(beer, customer);
        } else {
          checkForOverPour(beer);
        }
      }
    }

    if (beers[beer]._beer.movingToBartender) {
      getBartenderPostion();
      checkForGlassCollected(beer);
      checkForGlassMissed();
    }
    if (checkReturningCustomers()) {
      console.log("we have true");
      levelWon();
    }
  }
}
function checkReturningCustomers() {
  let countCustomersReturning = 0;
  for (let customer in customers) {
    checkReturnedToDoor(customers[customer]._customer);
    if (!customers[customer]._customer.movingForward) countCustomersReturning++;
  }
  if (countCustomersReturning === Object.keys(customers).length) return true;
  return false;
}
function checkReturnedToDoor(currentCustomer) {
  if (
    parseInt(currentCustomer.element.css("left")) < 20 &&
    !currentCustomer.movingForward
  ) {
    currentCustomer.element.css("display", "none");
  }
}
function getBeerPostion(beer) {
  beerPositionX = parseInt(beers[beer]._beer.beer.css("left"));
  beerPositionY = parseInt(beers[beer]._beer.beer.css("top"));
}
function getCustomerPostion(customer) {
  customerPositionX = parseInt(
    customers[customer]._customer.element.css("left")
  );
  customerPositionY = parseInt(
    customers[customer]._customer.element.css("top")
  );
}
function getBartenderPostion() {
  currentYbartender = parseInt($bartenderDiv.css("top"));
  currentXbartender = parseInt($bartenderDiv.css("left"));
}
function checkForServe(beer, customer) {
  // check if the y positions of the beer and customer match
  // and check if the beer and customer collided
  // check if the customer gets a beer
  if (
    beerPositionY === customerPositionY &&
    customerPositionX + 40 > beerPositionX
  ) {
    console.log('check for server');
    beers[beer]._beer.movingToCustomer = false;
    beers[beer]._beer.movingToBartender = true;
    beers[beer]._beer.beer.stop();
    beers[beer]._beer.glass.css("height", "30");
    customers[customer]._customer.element.stop();
    customers[customer]._customer.movingForward = false;
    beers[beer]._beer.beer.animate({ left: "+=460" }, 30000);
    addPoints(50);
    customerMovingBackToDoor(customers[customer]._customer);
  }
}
function checkForGlassCollected(beer) {
  if (
    beerPositionY === currentYbartender &&
    beerPositionX + 15 > currentXbartender
  ) {
    //remove the glass of beer
    beers[beer]._beer.beer.stop();
    beers[beer]._beer.beer.remove();
    beers[beer]._beer.movingToBartender = false;
    // 100 Points for each empty mug you pick up
    beers[beer]._beer.collected = true;
    addPoints(100);
  }
}
function checkForGlassMissed() {
  if (beerPositionX > bar._padding + bar._width) {
    killTheBartender();
      // console.log('kill thats breaking');

  }
}
function customerMovingBackToDoor(currentCustomer) {
  currentCustomer.element.css("backgroundColor", "green");
  currentCustomer.element.animate({ left: "-=420" }, 10000);
}
function customerMovingToBartender(currentCustomer, current) {
  currentCustomer.element.animate(
    { left: "+=420" },
    10000 * (current + 1), //SLOW cutomers for game
    // 1000 * (current + 1), //fast cutomers for testing
    function() {
      killTheBartender();
  // console.log('kill thats breaking');
      // console.log("killTheBartender");
    }
  );
}
function checkForOverPour(beer) {
  if (
    beerPositionX < 100 &&
    beers[beer]._beer.movingToCustomer &&
    !beers[beer]._beer.movingToBartender
  ) {
  console.log('kill thats breaking');
    killTheBartender();
  }
}
function killTheBartender() {
  pauseGame();
  loseLife();
  if (lives._lives > 0) {
    window.setTimeout(showGetReady, 1000);
  } else {
    window.setTimeout(checkForHighScores, 1000);
  }
}
function checkForHighScores() {
  if (points._amount > gameOver.highestScore()) showHighScoreForm();
  else showGameOver();
}
function showHighScoreForm() {
  console.log("showHighScoreForm");
  highScoreForm.setup();
  $("#submitHighScore").on("click", function() {
    gameOver.addNewHighScore(highScoreForm.inputValue(), points._amount);
    highScoreForm.remove();
    showGameOver();
  });
}
function showGameOver() {
  gameOver.setup();
  $("#restartButton").on("click", function() {
    gameOver.remove();
    resetLives();
    removeCustomers();
    removeBeers();
    clearLevel();
    clearPoints();
    clearRound();
  });
}
function levelWon() {
  pauseGame();
  addPoints(1000);
  addLevel();
  window.setTimeout(clearRound, 1000);
}
function pauseGame() {
  clearInterval(gameInterval);
  stopCustomers();
  stopBeers();
}
function loseLife() {
  lives._lives--;
  lives.remove();
  lives.setup();
}
function addPoints(add) {
  points._amount += add;
  $pointsDiv.text(points._amount);
}
function addLevel(){
  level._level++;
  $("#level").text(level._level);
}
function showGetReady() {
  getReady.setup();
  window.setTimeout(removeGetReady, 1000);
}
function removeGetReady() {
  getReady.remove();
  clearRound();
}
function clearRound() {
  resetBartender();
  removeCustomers();
  removeBeers();
  startRound();
}
function resetLives() {
  lives._lives = 3;
  lives.setup();
}
function resetBartender(){
  $bartenderDiv.css("top", bartender._startY);
  $bartenderDiv.css("left", bartender._startX);
}
function clearLevel(){
  level._level = 1;
  $("#level").text(level._level);
}
function clearPoints(){
  points._amount = 0;
  $pointsDiv.text(points._amount);
}
function stopCustomers() {
  for (let customer in customers) {
    customers[customer]._customer.element.stop();
  }
}
function stopBeers() {
  for (let beer in beers) {
    beers[beer]._beer.beer.stop();
  }
}
function removeCustomers() {
  for (let customer in customers) {
    customers[customer]._customer.element.remove();
  }
}
function removeBeers() {
  for (var beer in beers) {
    beers[beer]._beer.beer.remove();
  }
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
        beers[beerCount]._beer.beer.css("display", "block");
        beers[beerCount]._beer.glass.animate(
          { height: "-=30" },
          700,
          function() {
            //// BEER IS FULL, ANIMATION COMPLETE
            // move the beer across the bar
            // beers[beerCount]._beer.beer.animate({ left: "-=460" }, 100);
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
      bartender._startY + bar._padding * bar._amount + bartender._height / 2;
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
