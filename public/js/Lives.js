class Lives {

  constructor () {
    this.lives = 3;
    this.$lives = $("<div id='lives'></div>");
  }

  setup() {
    $("#container").append(this.$lives);
    this.createBeerLife();
  }

  createBeerLife(){
    for (var i = 0; i < this.lives; i++) {
      var $beerDiv = $("<div class='beerLife'></div>");
      $beerDiv.attr("id", "data-lives-index" + i);
      // position the lives beers with next position
      var nextPosition = 30 * i;
      $beerDiv.css("left", nextPosition + "px");
      this.$lives.append($beerDiv);
    }
  }

  remove() {
    let total = $("#lives > div").length
    for (var i = 0; i < total; i++) {
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
