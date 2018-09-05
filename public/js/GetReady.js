class GetReady {

  constructor() {
    this.$readyToServe = $("<div id='readyToServe'></div>");
  }

  setup() {
    const $resetGame = $("<div id='startGame'></div>");
    this.$readyToServe.append("<h1>get ready to serve</h1>");
    this.$readyToServe.append($resetGame);
    $("#container").append(this.$readyToServe);
  }
  remove() {
    this.$readyToServe.remove();
  }
}
export default GetReady;
