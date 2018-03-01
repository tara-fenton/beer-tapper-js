var $containerDiv = $("body").append("<div id='container'></div>");
// A brown rectangle for the row
var $barDiv = $("#container").append("<div class='bar'></div>");
// A purple square for bartender
var $bartenderDiv = $("#container").append("<div id='bartender'></div>");
// The customer will be a red square MOVING to the right
var $customerDiv = $("#container").append("<div class='customer'></div>");

// Spacebar will TRIGGER the beer to appear, a small white square
var $bartenderDiv = $("#container").append("<div class='beer'></div>");
$("body").on("keyup", function(evt) {
  // the numeric representation of the key the user pressed.
  var keyPressed = event.which;
  // access the beer DOM element
  $beer = $(".beer");
  // get the current left pixel value
  var currentXValue = $beer.css("left");
  currentXValue = parseInt(currentXValue);

  // var currentYValue = $mario.css('top');
  // currentYValue = parseInt(currentYValue);

  switch (keyPressed) {
    case 32: //spacebar
      // this moves the y-axis
      // var newValue = currentYValue - 30;
      // newValue += 'px';
      // $mario.css('top', newValue);

      // this moves the x
      // var newValue = currentXValue + 30;
      // newValue += 'px';
      // $mario.css('left', newValue);
      //$(".beer").css({ color: "yellow"; });
      $beer.css("background-color", "yellow");
      console.log("i pressed the spacebar");
      break;
    default:
      console.log(keyPressed);
  }
});
// The beer will be white for 2 seconds and change to yellow before it will be sent down the row
// The beer will collide with customer
// The customer will change to green and start moving to the left
