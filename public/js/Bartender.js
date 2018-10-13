class Bartender {

  constructor() {
    this.BARTENDER_HEIGHT = 80;
    this.BARTENDER_START_Y = 40;
    this.BARTENDER_START_X = 500;
    this.y = 0;
    this.x = 0;
  }

  setup() {
    $("#bartender").css("top", this.BARTENDER_START_Y + "px");
    $("#bartender").css("left", this.BARTENDER_START_X + "px");
  }

  get _height() {
    return this.BARTENDER_HEIGHT;
  }

  get _startY() {
    return this.BARTENDER_START_Y;
  }

  get _startX() {
    return this.BARTENDER_START_X;
  }

  get _x() {
    return this.x;
  }

  set _x(x) {
    return (this.x = x);
  }

  get _y() {
    return this.y;
  }

  set _y(y) {
    return (this.y = y);
  }

}
export default Bartender;
