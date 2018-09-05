import Bartender from "./Bartender.js";

class GameOver {

  constructor () {
  }

  setup() {
    var $end = $("<div id='end'></div>");
    $("#container").append($end);
    let $resetGame = $("<div id='resetGame'></div>");
    let $resetButton = $("<button>[ insert quarter ]</button>");
    $resetGame.append($resetButton);

    var $highScores = $("<div id='highScore'></div>");
    $end.append($highScores);
    //
    // $end.append("<h1>HIGH SCORES</h1>");
    // for (var i = 0; i < highScores.length; i++){
    //   $end.append("<h3>"+highScores[i].name+"   "+highScores[i].score+"</h3>");
    // }
    // $end.append("<h1 id='gameOver'>GAME OVER</h1>");
    // $end.append($resetGame);
    //
    // $resetButton.on('click', function() {
    //   $end.remove();
    //   //reset globals
    //   points = 0;
    //   $pointsDiv.text(points);
    //   lives = 3;
    //   level = 1;
    //   $levelDiv.text(level);
    //   //remove beer and customer objects
    //   removeObjects();
    //   // reset bartender to start at the top
    //   $bartenderDiv.css("top", BARTENDER_START_Y + "px");
    //   newLevel();
    //   createLives();
    // });

    // var highScores = [{name: 'tara', score: '1020'},{name: 'tara', score: '1010'},{name: 'tara', score: '1000'}];
    // function endGameCheckForHighScore() {
    //   var $checkForHighScores = $("<div id='enterHighScore'></div>");
    //   $("#container").append($checkForHighScores);
    //   var scoreToReplace = 4;
    //   $submitHighscore = $("<div id='submit'><button>[ Submit ]</button></div>");
    //
    //   for (var i = 0; i < highScores.length; i++){
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
}
export default GameOver;
