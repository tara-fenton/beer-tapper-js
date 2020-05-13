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

const $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);

const bar = new Bar();
bar.setup();

const $bartenderDiv = $("<div id='bartender'></div>");
$("#container").append($bartenderDiv);

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
let playing = false;
let won = false;

const startGame = new StartGame();
const getReady = new GetReady();
const highScoreForm = new HighScoreForm();
const gameOver = new GameOver();

$("#startButton").on("click", function() {
  $("#beerTapper").remove();
  startRound();
});

$("#instructionsButton").on("click", function() {
  startGame.instructions();

  $("#closeButton").on("click", function() {
    startGame.removeInstructions();
  });
});

function startRound() {
  setBeerProps();
  makeCustomers();
  playing = true;
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
  let amount = level._level * 4;
  let row = 0;
  for (let i = 0; i < amount; i++) {
    let customer = new Customer(i, row, bar);
    customer.setup();
    customerMovingToBartender(customer._customer, i);
    customers.push(customer);
    row++;
    if (row > 3) row = 0;
  }
}
function customerMovingToBartender(currentCustomer, current) {
  currentCustomer.element.animate(
    { left: "+=360" },
    5000 * (current + 1), //SLOW cutomers for game // TODO: something random
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
    if (
      Object.keys(customers).length > 0 &&
      checkReturningCustomers() &&
      !won
    ) {
      levelWon();
    }
  }
}
function getBeerPostion(beer) {
  beerPositionX = parseInt(beers[beer]._beer.beerContainer.css("left"));
  beerPositionY = parseInt(beers[beer]._beer.beerContainer.css("top"));
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
  if (
    customers[customer]._customer.movingForward &&
    beerPositionY === customerPositionY + 38 &&
    customerPositionX + 40 > beerPositionX
  ) {
    beers[beer]._beer.movingToCustomer = false;
    beers[beer]._beer.movingToBartender = true;
    beers[beer]._beer.beerContainer.stop();
    beers[beer]._beer.beer.css("display", "none");
    customers[customer]._customer.element.stop();
    customers[customer]._customer.movingForward = false;
    beers[beer]._beer.beerContainer.animate({ left: "+=460" }, 30000);
    addPoints(50);
    customerMovingBackToDoor(customers[customer]._customer);
  }
}
function customerMovingBackToDoor(currentCustomer) {
  currentCustomer.element.animate({ left: "-=420" }, 10000);
}
function checkForOverPour(beer) {
  if (beerPositionX < bar._startX && beers[beer]._beer.movingToCustomer) {
    killTheBartender();
  }
}
function getBartenderPostion() {
  bartender._y = parseInt($bartenderDiv.css("top"));
  bartender._x = parseInt($bartenderDiv.css("left"));
}
function checkForGlassCollected(beer) {
  if (
    beerPositionY === bartender._y + 60 &&
    beerPositionX + 15 > bartender._x
  ) {
    //remove the glass of beer
    beers[beer]._beer.beerContainer.stop();
    beers[beer]._beer.beerContainer.remove();
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
    parseInt(currentCustomer.element.css("left")) < bar._startX &&
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
    beers[beer]._beer.beerContainer.stop();
  }
}
function addPoints(add) {
  points._amount += add;
  $pointsDiv.text(points._amount);
}
function addLevel() {
  level._level++;
  $("#level").text(level._level);
}
function showGetReady() {
  getReady.setup();
  setTimeout(removeGetReady, 2000);
  clearRound();
}
function removeGetReady() {
  getReady.remove();
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
  }
  customers = [];
}
function removeBeers() {
  for (var beer in beers) {
    beers[beer]._beer.beerContainer.remove();
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
  lives.remove();
  lives._lives--;
  if (lives._lives > 0) lives.setup();
}
function endGame() {
  playing = false;
  resetLives();
  resetLevel();
  clearRound();
  checkForHighScores();
}
function resetLives() {
  lives.remove();
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

  getBartenderPostion();

  let keyPressed = evt.key;
  switch (keyPressed) {
    case " ":
    case 32: /////////// SPACEBAR //////////////////////////////
      if (!pouring && !won && playing) {
        pouring = true;
        makeBeer();
        fillBeer();
      }
      jumpBartenderLeft();
      break;

    case "ArrowLeft": //left key LEFT //////////////////////////////
    case 37: //left key LEFT //////////////////////////////
    case 65: //   a key LEFT //////////////////////////////
      moveBartenderLeft();
      break;
    case "ArrowRight": // right key RIGHT //////////////////////////////
    case 39: // right key RIGHT //////////////////////////////
    case 83: //     s key RIGHT //////////////////////////////
      moveBartenderRight();
      break;

    case "ArrowUp": //return key UP //////////////////////////////
    case 13: //return key UP //////////////////////////////
    case 20: //  caps key UP //////////////////////////////
    case 38: //     arrow UP //////////////////////////////
      moveBartenderUp();
      break;
    case "ArrowDown": //return key down //////////////////////////////
    case 16: // shift DOWN //////////////////////////////
    case 40: // arrow DOWN //////////////////////////////
      moveBartenderDown();
      break;
    default:
      break;
  }
});
function fillBeer() {
  let b = beers[beerCount];
  b._beer.beer.animate(
    { height: "+=25px", top: "-=25px" },
    700,
    function() {
      animateBeerLeft(b)
    }
  );
}
function animateBeerLeft(b) {
  b._beer.beerContainer.animate({ left: "-=460" }, 10000);
  b._beer.movingToCustomer = true;
  pouringSent = true; // used in key up event
}
function jumpBartenderLeft() {
  $bartenderDiv.css("left", bartender._startX + "px");
}
function moveBartenderLeft() {
  bartender._x = bartender._x - 5;
  // restrict from moving past the left of bar
  if (bartender._x < bar._padding) {
    bartender._x = bar._padding;
  }
  $bartenderDiv.css("left", bartender._x);
}
function moveBartenderRight() {
  bartender._x = bartender._x + 5;
  // restrict from moving past the right
  if (bartender._x > bartender._startX) {
    bartender._x = bartender._startX;
  }
  $bartenderDiv.css("left", bartender._x);
}
function moveBartenderUp() {
  bartender._y = bartender._y - bar._padding - bartender._height / 2;
  // loop around from the top to the bottom
  if (bartender._y < bartender._startY) {
    bartender._y =
      bartender._startY + bar._padding * bar._amount + bartender._height / 2;
  }
  $bartenderDiv.css("top", bartender._y);
  $bartenderDiv.css("left", bartender._startX);
}
function moveBartenderDown() {
  bartender._y = bartender._y + bar._padding + bartender._height / 2;
  // loop around from the bottom to the top and from the top to the bottom
  let downLimit =
    bartender._startY +
    bar._padding * (bar._amount + 1) +
    bartender._height / 2;
  if (bartender._y >= downLimit) {
    bartender._y = bartender._startY;
  }
  $bartenderDiv.css("top", bartender._y);
  $bartenderDiv.css("left", bartender._startX);
}
/////////////////////////////////////////// KEY UP /////////////////
$("body").on("keyup", function(evt) {
  let keyPressed = evt.key;
  switch (keyPressed) {
    case 32: //spacebar
    case ' ': //spacebar
      if (pouring) {
          pouring = false;

          if (pouringSent) {
            beerCount++;
            pouringSent = false;
          } else {
            beers[beerCount]._beer.beerContainer.css("display", "none");
            beers[beerCount]._beer.glass.stop();
            beers.pop();
          }
      }

    default:
      break;
  }
});
