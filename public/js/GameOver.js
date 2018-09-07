class GameOver {
  
  constructor() {
    this.$highScoresTitle = $("<h1>HIGH SCORES</h1>");
    this.$highScores = $("<div id='highScores'></div>");
    this.$gameOver = $("<h1 id='gameOver'>GAME OVER</h1>");
    this.$end = $("<div id='end'></div>");
    this.$restartButton = $(
      "<button id='restartButton'>[ insert quarter ]</button>"
    );
    this.highScores = [
      { name: "tara", score: "1020" },
      { name: "tara", score: "1010" },
      { name: "tara", score: "1000" }
    ];
  }

  setup() {
    this.$end.append(this.$highScoresTitle);
    for (var i = 0; i < this.highScores.length; i++){
      this.$highScores.append("<h3 id='hs"+i+"'>"+this.highScores[i].name+"   "+this.highScores[i].score+"</h3>");
    }
    this.$end.append(this.$highScores);
    this.$end.append(this.$gameOver);
    this.$end.append(this.$restartButton);
    $("#container").append(this.$end);
  }
  remove() {
    for (var i = 0; i < this.highScores.length; i++){
      $('#hs' + i).remove();
    }
    this.$end.remove();
  }
  addHighScores() {
    // var $checkForHighScores = $("<div id='enterHighScore'></div>");
    // $("#container").append($checkForHighScores);
    // var scoreToReplace = 4;
    // var $submitHighscore = $(
    //   "<div id='submit'><button>[ Submit ]</button></div>"
    // );

    // for (var i = 0; i < this.highScores.length; i++) {
    //   // make sure they got a high score
    //   if (points > this.highScores[i].score) {
    //     //game over with form
    //     console.log(this.highScores[i].name, this.highScores[i].score);
    //     $checkForHighScores.append("<h1>YOU GOT A HIGH SCORE!</h1>");
    //     $highscoreForm = $("<form><h2>ENTER YOUR NAME: </h2></form>");
    //     $highscoreName = $("<input type='text' id='highName'>");
    //
    //     $highscoreForm.append($highscoreName);
    //     $highscoreForm.append($submitHighscore);
    //     $checkForHighScores.append($highscoreForm);
    //
    //     scoreToReplace = i;
    //     break;
    //   }
    // }
    // // didn't have a high score
    // if (scoreToReplace === 4) {
    //   $checkForHighScores.remove();
    //   endGame();
    // }
  }
  //   $submitHighscore.click(function(evt) {
  //     evt.preventDefault();
  //     $submitHighscore.submit();
  //     this.highScores[scoreToReplace].name = $highscoreName.val();
  //     this.highScores[scoreToReplace].score = points;
  //      // console.log($highscoreName.val())
  //      $checkForHighScores.remove();
  //      endGame();
  //   });
  // }
}
export default GameOver;
