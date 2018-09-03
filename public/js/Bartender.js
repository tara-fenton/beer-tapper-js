class Bartender {

  constructor() {
    this.BARTENDER_HEIGHT = 80;
    // this.BARTENDER_WIDTH = 40;
    this.BARTENDER_START_Y = 100;
    this.BARTENDER_START_X = 500;
    this.currentYbartender = 0;
    this.newYbartender = 0;
    this.currentXbartender = 0;
    this.newXbartender = 0;
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
    return this.currentXbartender;
  }

  set _x(x) {
    return (this.currentXbartender = x);
  }

  get _y() {
    return this.currentYbartender;
  }

  set _y(y) {
    return (this.currentYbartender = y);
  }

  get _newY() {
    return this.newYbartender;
  }

  set _newY(y) {
    return (this.newYbartender = y);
  }

}
export default Bartender;
