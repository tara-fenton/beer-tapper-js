class StartGame {

  constructor() {
    this.$readyToServe = $("<div id='readyToServe'><h1>get ready to serve</h1></div>");
    this.$startGame = $("<div id='startGame'></div>");
    this.$startButton = $("<button id='startButton'>[ insert quarter ]</button>");
    this.$instructionsButton = $("<button id='instructionsButton'>[ instructions ]</button>");
    this.$closeButton = $("<button id='closeButton'>[ close ]</button>");
    this.$instructions = $("<div id='instructions'>A game that is insprired by the arcade game Beer Tapper. <br>The rules are simple. <ol><li>Serve your customers a beer before they reach the end of the bar. </li><li> Don’t over pour. </li><li> Collect your empty glasses.</li></ol></div>");
    $("#instructions").css("color", "red");
    this.$startGame.append(this.$startButton);
    this.$startGame.append(this.$instructionsButton);
    this.$readyToServe.append(this.$startGame);
    this.$readyToServe.append(this.$instructions);
    this.$readyToServe.append(this.$closeButton);
    $("#container").append(this.$readyToServe);

    this.$instructions.hide();
    this.$closeButton.hide();
  }
  instructions() {
    this.$instructions.show();
    this.$closeButton.show();

    this.$startButton.hide();
    this.$instructionsButton.hide();
  }
  removeInstructions() {
    this.$instructions.hide();
    this.$closeButton.hide();

    this.$startButton.show();
    this.$instructionsButton.show();
  }

}
export default StartGame;
