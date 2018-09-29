class Lives {

  constructor () {
    this.lives = 1;
    this.$lives = $("<div id='lives'></div>");
  }

  setup() {
    // this.$lives
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
    console.log("lives length ",$("#lives > div").length);
  }

  remove() {
    for (var i = 0; i <= $("#lives > div").length; i++) {
        $("#data-lives-index"+i).remove();
    }
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
