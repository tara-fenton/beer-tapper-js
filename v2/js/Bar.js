class Bar {

  constructor () {
    this.BARS_AMOUNT = 4;
    this.BAR_PADDING = 80;
    this.BAR_START_X = 100;
    this.BAR_START_Y = 140;
    this.BAR_WIDTH = 400;
  }

  setup() {
    for (let i = 0; i < this.BARS_AMOUNT; i++) {
      var $barDiv = $("<div class='bar'></div>")
      var $barHighlightDiv = $("<div class='bar-highlight'></div>");
      $($barDiv).append($barHighlightDiv);
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
  get _startX() {
    return this.BAR_START_X;
  }
  get _width() {
    return this.BAR_WIDTH;
  }
}
export default Bar;
