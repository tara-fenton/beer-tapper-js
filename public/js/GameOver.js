class GameOver {

  constructor() {
    this.$highScoresTitle = $("<h1>HIGH SCORES</h1>");
    this.$highScores = $("<div id='highScores'></div>");
    this.$gameOver = $("<h1 id='gameOver'>GAME OVER</h1>");
    this.$end = $("<div id='end'></div>");
    this.$restartButton = $(
      "<button id='restartButton'>[ insert quarter ]</button>"
    );
    this.highScores = JSON.parse(localStorage.getItem('highScores')) || [
      { name: "tara", score: 300 },
      { name: "tara", score: 400 },
      { name: "tara", score: 100 }
    ];
  }

  setup() {
    // localStorage.setItem('highScores', JSON.stringify(this.highScores));
    this.$end.append(this.$highScoresTitle);
    for (var i = 0; i < this.highScores.length; i++) {
      this.$highScores.append(
        "<h3 id='hs" +
          i +
          "'>" +
          this.highScores[i].name +
          "   " +
          this.highScores[i].score +
          "</h3>"
      );
    }
    this.$end.append(this.$highScores);
    this.$end.append(this.$gameOver);
    this.$end.append(this.$restartButton);
    $("#container").append(this.$end);
  }

  remove() {
    for (var i = 0; i < this.highScores.length; i++) {
      $("#hs" + i).remove();
    }
    this.$end.remove();
  }
  highScoreRange(points) {
    this.sortScores();
    if (points > this.lowestScore()) return true;
    else return false;
  }

  lowestScore() {
    return this.highScores[2].score;
  }
  sortScores() {
    this.highScores.sort(function(obj1, obj2) {
      return obj2.score - obj1.score;
    });
    return this.highScores;
  }

  addNewHighScore(name, score) {
    this.highScores.unshift({ name: name, score: score });
    this.sortScores();
    this.highScores.pop();
    localStorage.setItem('highScores', JSON.stringify(this.highScores));
  }

}
export default GameOver;
