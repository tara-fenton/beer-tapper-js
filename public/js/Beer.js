class Beer {

  constructor (count, bartender) {
    this.beerCount = count;
    this.Bartender = bartender;
    this.x = 472;
    this.beerObj = {};
  }

  setup() {
    //add the glass for the beer
    const $beerContainer = $("<div class='beerContainer'></div>");
    const $beerDiv = $("<div class='beer'></div>");
    const $glass = $("<div class='glass'></div>");
    //do i really need this id if I have an object?
    $beerContainer.attr("id", "data-beer-index" + this.beerCount);
    // position the beer next to the bartender
    $beerContainer.css("left", this.x + "px");
    //currentYbartender = parseInt($bartenderDiv.css("top"));
    $beerContainer.css("top", this.Bartender._y + "px");
    // $beerDiv.append($glass);
    $beerContainer.append($beerDiv);
    $beerContainer.append($glass);
    $("#container").append($beerContainer);

    //beer object
    this.beerObj.id = "data-beer-index" + this.beerCount;
    this.beerObj.beer = $beerDiv;
    this.beerObj.glass = $glass;
    this.beerObj.beerContainer = $beerContainer;
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
