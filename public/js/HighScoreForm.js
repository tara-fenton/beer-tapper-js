class HighScoresForm {

  constructor() {
    this.$highScoresTitle = $("<h1>YOU GOT A HIGH SCORE!</h1>");
    // this.$highScores = $("<div id='highScores'></div>");
    // this.$gameOver = $("<h1 id='gameOver'>GAME OVER</h1>");
    this.$highscoreForm = $("<form><h2>ENTER YOUR NAME: </h2></form>");
    this.$highscoreName = $("<input type='text' id='highName'>");
    this.$submitHighscore = $("<div id='submit'><button>[ Submit ]</button></div>");

    this.$enterHighScore = $("<div id='enterHighScore'></div>");
    // this.$restartButton = $(
    //   "<button id='restartButton'>[ insert quarter ]</button>"
    // );
    // this.highScores = [
    //   { name: "tara", score: "1020" },
    //   { name: "tara", score: "1010" },
    //   { name: "tara", score: "1000" }
    // ];
  }

  setup() {
    // this.$end.append(this.$highScoresTitle);
    // for (var i = 0; i < this.highScores.length; i++){
    //   this.$highScores.append("<h3 id='hs"+i+"'>"+this.highScores[i].name+"   "+this.highScores[i].score+"</h3>");
    // }
    this.$enterHighScore.append(this.$highScoresTitle);
    this.$enterHighScore.append(this.$highscoreForm);
    this.$highscoreForm.append(this.$highscoreName);
    this.$enterHighScore.append(this.$submitHighscore);
    $("#container").append(this.$enterHighScore);
  }

}
export default HighScoresForm;
