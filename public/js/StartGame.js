class StartGame {

  constructor() {}

  setup() {
    const $readyToServe = $("<div id='readyToServe'></div>");
    const $resetGame = $("<div id='startGame'></div>");
    const $startButton = $("<button id='startButton'>[ insert quarter ]</button>");
    $readyToServe.append("<h1>get ready to serve</h1>");
    $readyToServe.append($resetGame);
    $resetGame.append($startButton);
    $("#container").append($readyToServe);
  }
}
export default StartGame;
