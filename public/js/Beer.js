class Beer {

  constructor (count, bartender) {
    this.beerCount = count;
    this.Bartender = bartender;
    this.x = 472;
    this.beerObj = {};
  }

  setup() {
    const containerDiv = this.createContainerDiv();
    const beerDiv = this.createBeerDiv(containerDiv);
    const glassDiv = this.createGlassDiv(containerDiv);
    this.beerCSS(containerDiv);
    this.createBeerObject(containerDiv, beerDiv, glassDiv);
  }
  createContainerDiv() {
    const $beerContainer = $("<div class='beerContainer'></div>");
    $("#container").append($beerContainer);
    return $beerContainer;
  }
  createBeerDiv(containerDiv) {
    const $beerDiv = $("<div class='beer'></div>");
    containerDiv.append($beerDiv);
    return $beerDiv;
  }
  createGlassDiv(containerDiv) {
    const $glassDiv = $("<div class='glass'></div>");
    containerDiv.append($glassDiv);
    return $glassDiv;
  }

  beerCSS(containerDiv) {
    containerDiv.attr("id", "data-beer-index" + this.beerCount);
    containerDiv.css("left", this.x + "px");
    containerDiv.css("top", this.Bartender._y + 60 + "px");
  }
  createBeerObject(containerDiv, beerDiv, glassDiv){
    this.beerObj.beerContainer = containerDiv;
    this.beerObj.beer = beerDiv;
    this.beerObj.glass = glassDiv;
    // this.beerObj.drinking = false;
    this.beerObj.movingToCustomer = false; //will be false upon creation
    this.beerObj.movingToBartender = false; //need to check for both directions
    this.beerObj.pouring = true; //need to check for both directions
    this.beerObj.collected = false; //used to check for win level
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
