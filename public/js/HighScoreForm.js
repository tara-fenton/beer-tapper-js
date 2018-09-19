class HighScoresForm {

  constructor() {
    this.$highScoreTitle = $("<h1>YOU GOT A HIGH SCORE!</h1>");
    this.$highScoreForm = $("<form><h2>ENTER YOUR NAME: </h2></form>");
    this.$highScoreName = $("<input type='text' id='highName'>");
    this.$submitHighScore = $("<div id='submitHighScore'><button>[ Submit ]</button></div>");
    this.$enterHighScore = $("<div id='enterHighScore'></div>");
  }

  setup() {
    this.$enterHighScore.append(this.$highScoreTitle);
    this.$enterHighScore.append(this.$highScoreForm);
    this.$highScoreForm.append(this.$highScoreName);
    this.$enterHighScore.append(this.$submitHighScore);
    $("#container").append(this.$enterHighScore);
  }

  remove() {
    this.$highScoreForm.remove();
    this.$enterHighScore.remove();
  }

  inputValue() {
    return this.$highScoreName.val();
  }

}
export default HighScoresForm;
