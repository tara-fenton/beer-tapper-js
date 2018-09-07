class GameOver {

  constructor () {
    this.$end = $("<div id='end'><h1>GameOver</h1></div>");
    this.$restartGame = $("<div id='restartGame'></div>");
    this.$restartButton = $("<button id='restartButton'>[ insert quarter ]</button>");

    // this.$resetButton = $("<button id='restartButton'>[ insert quarter ]</button>");
    // this.highScores = [{name: 'tara', score: '1020'},{name: 'tara', score: '1010'},{name: 'tara', score: '1000'}];
  }

  setup() {
    console.log("game over ended");

      this.$end.append(this.$restartGame);
      this.$restartGame.append(this.$restartButton);

      $("#container").append(this.$end);
}
    // addHighScores() {
    //   var $checkForHighScores = $("<div id='enterHighScore'></div>");
    //   $("#container").append($checkForHighScores);
    //   var scoreToReplace = 4;
    //   $submitHighscore = $("<div id='submit'><button>[ Submit ]</button></div>");
    //
    //   for (var i = 0; i < this.highScores.length; i++){
    //     // make sure they got a high score
    //     if (points > highScores[i].score) {
    //       //game over with form
    //       console.log(highScores[i].name, highScores[i].score)
    //       $checkForHighScores.append("<h1>YOU GOT A HIGH SCORE!</h1>");
    //       $highscoreForm = $("<form><h2>ENTER YOUR NAME: </h2></form>");
    //       $highscoreName = $("<input type='text' id='highName'>");
    //
    //       $highscoreForm.append($highscoreName);
    //       $highscoreForm.append($submitHighscore);
    //       $checkForHighScores.append($highscoreForm);
    //
    //       scoreToReplace = i;
    //       break;
    //     }
    //   }
    //   // didn't have a high score
    //   if (scoreToReplace === 4) {
    //     $checkForHighScores.remove();
    //     endGame();
    //   }
    // }
    //   $submitHighscore.click(function(evt) {
    //     evt.preventDefault();
    //     $submitHighscore.submit();
    //     highScores[scoreToReplace].name = $highscoreName.val();
    //     highScores[scoreToReplace].score = points;
    //      // console.log($highscoreName.val())
    //      $checkForHighScores.remove();
    //      endGame();
    //   });
    // }
}
export default GameOver;
