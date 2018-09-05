// import Bartender from "./Bartender.js";

class Beer {

  constructor (count, bartender) {
    this.Bartender = bartender;
    //console.log();
    this.x = 472;
    this.beerCount = count;

    this.beerObj = {};
  }

  setup() {
    //add the glass for the beer
    const $glass = $("<div class='glass'></div>");
    const $beerDiv = $("<div class='beer'></div>");
    //do i really need this id if I have an object?
    $beerDiv.attr("id", "data-beer-index" + this.beerCount);
    // position the beer next to the bartender
    $beerDiv.css("left", "472px");
    //currentYbartender = parseInt($bartenderDiv.css("top"));
    $beerDiv.css("top", this.Bartender._y + "px");
    $beerDiv.append($glass);
    $("#container").append($beerDiv);

    //beer object

    this.beerObj.id = "data-beer-index" + this.beerCount;
    this.beerObj.beer = $beerDiv;
    this.beerObj.glass = $glass;
    this.beerObj.drinking = false;
    this.beerObj.movingToCustomer = false; //will be false upon creation
    this.beerObj.movingToBartender = false; //need to check for both directions
    this.beerObj.collected = false; //used to check for win level
    //beerObj.barRow = 0; //this will change
    // beersObj[this.beerCount] = beerObj;
  }

  get _x() {
    return this.x;
  }

  set _x(x) {
    return (this.x = x);
  }

  get _beer() {
    return this.beerObj;
  }

  set _beer(beerObj) {
    return (this.beerObj = beerObj);
  }

}
export default Beer;
