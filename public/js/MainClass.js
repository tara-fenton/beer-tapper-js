import Bar from "./Bar.js";
import Bartender from "./Bartender.js";
import Beer from "./Beer.js";
import Customer from "./Customer.js";
import Level from "./Level.js";

var $containerDiv = $("body").append("<div id='container'></div>");

const bar = new Bar();
bar.setup();

var $bartenderDiv = $("<div id='bartender'></div>");
$("#container").append($bartenderDiv);

const bartender = new Bartender();
bartender.setup();

var $customersDiv = $("<div class='customers'></div>");
$("#container").append($customersDiv);

// var $levelDiv = $("<div id='level'></div>");
// $("#container").append($levelDiv);
//
// const level = new Level();
// $("#level").append(String(level._level));
// level.setup();
// console.log(typeof level._level);


// $levelDiv.append(Level.level);

let customers = [];
function makeCustomers() {
  for (let i = 0; i < 4; i++){
    const customer = new Customer(i);
    customer.setup();
    customers.push(customer);
  }
}
makeCustomers();
console.log(customers);

let beers = [];
let beerCount = 0;
let beer = new Beer(beerCount);
beer.setup();
beers.push(beer);

/////////////////////////////////////////// KEY DOWN /////////////////
$("body").on("keydown", function(evt) {
  // get the current x and y of bartender
  bartender._y = parseInt($bartenderDiv.css("top"));
  bartender._x = parseInt($bartenderDiv.css("left"));

  var keyPressed = event.which;
  switch (keyPressed) {
    case 32: /////////// SPACEBAR //////////////////////////////
      // if (!pouring) {
        // create beer object and DOM element
      //  createBeer();
        // pouring = true;
        // pouring the beer into the glass
        console.log("hello ",beers[beerCount]._beer);
        beers[beerCount]._beer.beer.css("display", "block");
        beers[beerCount]._beer.glass.animate({ height: "-=30" }, 700, function() {
          //// BEER IS FULL, ANIMATION COMPLETE
          // move the beer across the bar
          beers[beerCount].beer.animate({ left: "-=460" }, 10000);
          //beers[beerCount].movingToCustomer = true;
        //  pouringSent = true; // used in key up event
        });
      // }
      // jump back to tap by pouring (space bar)
      $bartenderDiv.css("left", bartender._startX + "px");
      break;

    case 37: //left key LEFT //////////////////////////////
    case 65: //   a key LEFT //////////////////////////////
      bartender._newX = bartender._x - 5;
      // restrict from moving past the left of bar
      if (bartender._newX < bar._padding) {
        bartender._newX = bar._padding;
      }
      bartender._newX += "px";
      $bartenderDiv.css("left", bartender._newX);
      // TO DO : catch a beer glass
      break;
    case 39: // right key RIGHT //////////////////////////////
    case 83: //     s key RIGHT //////////////////////////////
      bartender._newX = bartender._x + 5;
      // restrict from moving past the right
      if (bartender._newX > bartender._startX) {
        bartender._newX = bartender._startX;
      }
      bartender._newX += "px";
      $bartenderDiv.css("left", bartender._newX);
      break;

    case 13: //return key UP //////////////////////////////
    case 20: //  caps key UP //////////////////////////////
    case 38: //     arrow UP //////////////////////////////
      bartender._newY = bartender._y - bar._padding - bartender._height / 2;

      // loop around from the top to the bottom
      if (bartender._newY < bartender._startY) {
        bartender._newY =
          bartender._startY +
          bar._padding * bar._amount +
          bartender._height / 2;
      }
      // // set the y position of bartender
      bartender._newY += "px";
      $bartenderDiv.css("top", bartender._newY);
      // // set the x position of the bartender
      $bartenderDiv.css("left", bartender._startX);
      // TO DO : stop pouring by moving to another row
      break;
    case 16: // shift DOWN //////////////////////////////
    case 40: // arrow DOWN //////////////////////////////
      bartender._newY = bartender._y + bar._padding + bartender._height / 2;

      // loop around from the bottom to the top and from the top to the bottom
      var downLimit =
        bartender._startY +
        bar._padding * (bar._amount + 1) +
        bartender._height / 2;
      if (bartender._newY >= downLimit) {
        bartender._newY = bartender._startY;
      }
      // set the y position of bartender
      bartender._newY += "px";
      $bartenderDiv.css("top", bartender._newY);
      // set the x position of the bartender
      $bartenderDiv.css("left", bartender._startX);
      // TO DO : stop pouring by moving to another row
      break;
    default:
      break;
  }
});
/////////////////////////////////////////// KEY UP /////////////////
// $("body").on("keyup", function(evt) {
//   var keyPressed = event.which;
//   switch (keyPressed) {
//     case 32: //spacebar
//       // check if the beer is pouring BUT not being sent to customer
//       if (pouring && !pouringSent) {
//         pouring = false;
//         // stop pouring the beer into the glass
//         beers[beerCount].beer.css("display", "none");
//         beers[beerCount].beer.css("height", "30px");
//         beers[beerCount].glass.stop();
//       }
//       // check if the beer is pouring AND being sent to customer
//       if (pouring && pouringSent) {
//         // now its ok to add another beer
//          beerCount++;
//          // reset these values for next beer
//          pouring = false;
//          pouringSent = false;
//       }
//     default:
//       break;
//   }
// });
