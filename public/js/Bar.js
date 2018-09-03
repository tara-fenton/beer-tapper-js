class Bar {

  constructor () {
    this.BARS_AMOUNT = 4;
    this.BAR_PADDING = 80;
    this.BAR_START_X = 100;
    this.BAR_START_Y = 100;
    this.BAR_WIDTH = 400;
    this.BAR_HEIGHT = 40;
  }

  setup() {
    for (let i = 0; i < this.BARS_AMOUNT; i++) {
      var $barDiv = $("<div class='bar'></div>");
      $("#container").append($barDiv);
      $barDiv.attr("id", "data-bar-index" + i);
      $barDiv.css("left", this.BAR_START_X + "px");
      $barDiv.css("top", this.BAR_PADDING * i + this.BAR_START_Y + "px");
    }
  }
  get _amount() {
    return this.BARS_AMOUNT;
  }
  get _padding() {
    return this.BAR_PADDING;
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
export default Bar;
