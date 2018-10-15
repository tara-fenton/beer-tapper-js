class BonusRound {

  constructor() {
    this.bonusDiv = $("<div id='bonus'></div>");
    this.bonusText = $("<h1 id='bonusRound'>BONUS ROUND</h1>");
  }

  setup() {
    this.bonusDiv.append(this.bonusText);
    $("#container").append(this.bonusDiv);
    this.createBeers();
  }

  createBeers() {
    for (let i = 0; i < 6; i++) {
      this.beersDiv = $("<div class='bonusBeers'></div>");
      this.beersDiv.attr("id", "bonusBeer"+ i);
      this.beersDiv.css("left", 110 + (i * 70)+"px");
      this.bonusDiv.append(this.beersDiv);
      this.shake(i);
    }
  }

  shake(element) {
    setTimeout(function() {
      $("#bonusBeer" + element).effect("shake", { direction: "up", times: 4, distance: 10});
    }, 900 * element);
  }

}
export default BonusRound;
