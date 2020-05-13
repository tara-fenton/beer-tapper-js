class StartGame {

  constructor() {
    this.$readyToServe = $("<div id='beerTapper'><h1>beer tapper</h1></div>");
    $("#container").append(this.$readyToServe);

    this.$startButton = $("<button id='startButton'>[ insert quarter ]</button>");
    this.$readyToServe.append(this.$startButton);

    this.$instructionsButton = $("<button id='instructionsButton'>[ instructions ]</button>");
    this.$readyToServe.append(this.$instructionsButton);

    this.$instructions = $("<div id='instructions'></div>");
    $("#container").append(this.$instructions);

    this.$instructionsText = $("<div id='instructionsText'><h1>Instructions</h1>A game that is insprired by the arcade game Beer Tapper. <br>The rules are simple. <ol><li>Serve your customers a beer before they reach the end of the bar. </li><li> Don’t over pour. </li><li> Collect your empty glasses.</li></ol></div>");
    this.$instructionsImages = $("<div id='instructionsImages'><img src='./images/space.png' /><img src='./images/arrows.png' /></div>");
    this.$instructions.append(this.$instructionsText);
    this.$instructions.append(this.$instructionsImages);

    this.$closeButton = $("<button id='closeButton'>[ close ]</button>");
    this.$instructions.append(this.$closeButton);

    this.$instructions.hide();
  }
  instructions() {
    this.$instructions.show();
    this.$readyToServe.hide();
  }
  removeInstructions() {
    this.$instructions.hide();
    this.$readyToServe.show();
  }

}
export default StartGame;
