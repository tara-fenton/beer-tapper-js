class Level {

  constructor() {
    this.level = 1;
  }

  setup() {
    // console.log('setup level');
    // // $("#level").html(_level);
    // console.log(this._level);
    // $levelDiv.append((this._level));

    //let $customerDiv = $("<div class='customer'></div>");

  }

  get _level() {
    return this.level;
  }

  set _level(l) {
    return (this.level = l);
  }
}
export default Level;
