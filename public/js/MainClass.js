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

const bartender = new Bartender();
bartender.setup();

let gameInterval;
let customers = [];
let beers;
let beerCount;
let pouring;
let pouringSent;
let beerPositionX = 0;
let beerPositionY = 0;
let customerPositionX = 0;
let customerPositionY = 0;
let currentYbartender = 0;
let currentXbartender = 0;
let won = false;

const startGame = new StartGame();
const getReady = new GetReady();
const highScoreForm = new HighScoreForm();
const gameOver = new GameOver();

$("#startButton").on("click", function() {
  $("#beerTapper").remove();
  startRound();
});

$("#instructionsButton").on('click', function() {
  startGame.instructions();

  $("#closeButton").on('click', function() {
    startGame.removeInstructions();
  })
})


function startRound() {
  setBeerProps();
  makeCustomers();
  won = false;
  gameInterval = setInterval(beersAndCustomersCollisions, 100);
}
function setBeerProps() {
  beers = [];
  beerCount = 0;
  pouring = false;
  pouringSent = false;
}
function makeCustomers() {
  for (let i = 0; i < 4; i++) {
    let customer = new Customer(i, bar);
    customer.setup();
    customerMovingToBartender(customer._customer, i);
    customers.push(customer);
  }
}
function customerMovingToBartender(currentCustomer, current) {
  currentCustomer.element.animate(
    { left: "+=420" },
    10000 * (current + 1), //SLOW cutomers for game // TODO: something random
    // 1000 * (current + 1), //fast cutomers for testing
    function() {
      killTheBartender();
    }
  );
}
function beersAndCustomersCollisions() {
  for (let beer in beers) {
    getBeerPostion(beer);
    if (beers[beer]._beer.movingToCustomer) {
      for (let customer in customers) {
        getCustomerPostion(customer);
        checkForServe(beer, customer);
      }
      checkForOverPour(beer);
    }

    if (beers[beer]._beer.movingToBartender) {
      getBartenderPostion();
      checkForGlassCollected(beer);
      checkForGlassMissed();
    }
    if (Object.keys(customers).length > 0 && checkReturningCustomers() && !won) {
      levelWon();
    }
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
function checkForServe(beer, customer) {
  if (customers[customer]._customer.movingForward &&
    beerPositionY === customerPositionY &&
    customerPositionX + 40 > beerPositionX
  ) {
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
function customerMovingBackToDoor(currentCustomer) {
  currentCustomer.element.css("backgroundColor", "green");
  currentCustomer.element.animate({ left: "-=420" }, 10000);
}
function checkForOverPour(beer) {
  if (beerPositionX < 100 && beers[beer]._beer.movingToCustomer) {
    killTheBartender();
  }
}
function getBartenderPostion() {
  currentYbartender = parseInt($bartenderDiv.css("top"));
  currentXbartender = parseInt($bartenderDiv.css("left"));
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
  if (beerPositionX > bar._padding + bar._width) killTheBartender();
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
function levelWon() {
  won = true;
  pauseGame();
  addPoints(1000);
  setTimeout(showGetReady, 2000);
  addLevel();
}
function pauseGame() {
  clearInterval(gameInterval);
  stopCustomers();
  stopBeers();
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
function addPoints(add) {
  points._amount += add;
  $pointsDiv.text(points._amount);
}
function addLevel() {
  console.log('add level',beers);
  level._level++;
  $("#level").text(level._level);
}
function showGetReady() {
  getReady.setup();
  // clearTimeout(showGetReady);

  setTimeout(removeGetReady, 2000);
}
function removeGetReady() {
  getReady.remove();
  // clearTimeout(removeGetReady);

  clearRound();
  // trying new location
  startRound();
}
function clearRound() {
  resetBartender();
  removeCustomers();
  removeBeers();
}
function resetBartender() {
  $bartenderDiv.css("top", bartender._startY);
  $bartenderDiv.css("left", bartender._startX);
}
function removeCustomers() {
  for (let customer in customers) {
    customers[customer]._customer.element.remove();
    //clearTimeout(customers[customer].timeout);
  }
  customers = [];
}
function removeBeers() {
  for (var beer in beers) {
    beers[beer]._beer.beer.remove();
  }
  beers = [];
}

function killTheBartender() {
  pauseGame();
  loseLife();
  if (lives._lives > 0) setTimeout(showGetReady, 2000);
  else setTimeout(endGame, 2000);
}
function loseLife() {
  lives._lives--;
  lives.remove();
  lives.setup();
}
function endGame() {
  // clearTimeout(endGame);
  resetLives();
  resetLevel();
  clearRound();
  checkForHighScores();
}
function resetLives() {
  lives._lives = 3;
  lives.setup();
}
function resetLevel() {
  level._level = 1;
  $("#level").text(level._level);
}
function checkForHighScores() {
  if (gameOver.highScoreRange(points._amount)) showHighScoreForm();
  else showGameOver();
}
function showHighScoreForm() {
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
    resetPoints();
    startRound();
  });
}
function resetPoints() {
  points._amount = 0;
  $pointsDiv.text(points._amount);
}

function makeBeer() {
  const beer = new Beer(beerCount, bartender);
  beer.setup();
  beers.push(beer);
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
        beers[beerCount]._beer.beer.css("top", bartender._y +"px");
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
        beers.pop();
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
