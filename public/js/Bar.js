class Bar {
  constructor () {
    // this.container = container;
    this.BARS_AMOUNT = 4;
  }
  setup(container) {
    // const BARS_AMOUNT = 4;
    const BAR_PADDING = 80;
    const BAR_START_X = 100;
    const BAR_START_Y = 100;
    const BAR_WIDTH = 400;
    const BAR_HEIGHT = 40;
    for (let i = 0; i < this.BARS_AMOUNT; i++) {
      var $barDiv = $("<div class='bar'></div>");
      $("#container").append($barDiv);
      $barDiv.attr("id", "data-bar-index" + i);
      $barDiv.css("left", BAR_START_X + "px");
      $barDiv.css("top", BAR_PADDING * i + BAR_START_Y + "px");
    }
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
