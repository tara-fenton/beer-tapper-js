class Lives {

  constructor () {
    this.lives = 3;
    this.$lives;
  }

  setup() {
    this.$lives = $("<div id='lives'></div>");
    $("#container").append(this.$lives);
    this.createBeerLife();
  }

  createBeerLife(){
    for (var i = 0; i < this.lives; i++) {
      var $beerDiv = $("<div class='beer'></div>");
      $beerDiv.attr("id", "data-lives-index" + i);
      // position the lives beers with next position
      var nextPosition = 30 * i;
      $beerDiv.css("left", nextPosition + "px");
      this.$lives.append($beerDiv);
    }
  }

  remove() {
    this.$lives.remove();
  }

  get _lives() {
    return this.lives;
  }

  set _lives(l) {
    return this.lives = l;
  }
}
export default Lives;
