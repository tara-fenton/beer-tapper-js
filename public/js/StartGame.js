class StartGame {

  constructor() {}

  setup() {
    const $readyToServe = $("<div id='readyToServe'></div>");
    const $resetGame = $("<div id='startGame'></div>");
    const $startButton = $("<button id='startButton'>[ insert quarter ]</button>");
    // const $instructionsButton = $("<button id='instructionsButton'>[ instructions ]</button>");
    // const $instructions = $("<div id='instructions'>these are the instructions</div>");
    $readyToServe.append("<h1>get ready to serve</h1>");
    $readyToServe.append($resetGame);
    $resetGame.append($startButton);
    // $resetGame.append($instructionsButton);
    // $resetGame.append($instructions);
    $("#container").append($readyToServe);
  }
  instructions() {
    console.log('in strtuctions');
    $("#instructions").css("color", "red");
    // $("#container").append($readyToServe);
  }
}
export default StartGame;
