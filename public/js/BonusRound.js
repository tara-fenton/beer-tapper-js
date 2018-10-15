class BonusRound {

  constructor() {
    this.bonusDiv = $("<div id='bonus'></div>");
    this.bonusText = $("<h1 id='bonusRound'>BONUS ROUND</h1>");

  }

  setup() {
    this.bonusDiv.append(this.bonusText);
    $("#container").append(this.bonusDiv);
  }



}
export default BonusRound;
