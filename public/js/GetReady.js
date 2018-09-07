class GetReady {

  constructor() {
    this.$readyToServe = $("<div id='readyToServe'><h1>get ready to serve</h1></div>");
    this.$resetGame = $("<div id='startGame'></div>");
  }

  setup() {
    this.$readyToServe.append(this.$resetGame);
    $("#container").append(this.$readyToServe);
  }
  remove() {
    this.$resetGame.remove();
    this.$readyToServe.remove();
  }
}
export default GetReady;
