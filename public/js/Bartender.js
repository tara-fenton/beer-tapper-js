class Bartender {

  constructor() {
    this.BARTENDER_HEIGHT = 80;
    this.BARTENDER_WIDTH = 40;
    this.BARTENDER_START_Y = 100;
    this.BARTENDER_START_X = 500;
    this.currentYbartender = 0;
    this.newYbartender = 0;
    this.currentXbartender = 0;
    this.newXbartender = 0;
  }

  setup() {
    var $bartenderDiv = $("<div id='bartender'></div>");
    $bartenderDiv.css("top", this.BARTENDER_START_Y + "px");
    $bartenderDiv.css("left", this.BARTENDER_START_X + "px");
    $("#container").append($bartenderDiv);
  }

  //   const getPadding(){
  //     return BAR_PADDING;
  // }
  //   const getAmount(){
  //     return BARS_AMOUNT;
  // }
  //   const getStartX(){
  //     return BAR_START_X;
  // }
  //   const getEnd() { return BAR_START_X + BAR_WIDTH; }
}
export default Bartender;
