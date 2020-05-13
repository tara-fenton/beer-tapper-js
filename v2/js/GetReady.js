class GetReady {

  constructor() {
    this.$readyToServe = $("<div id='readyToServe'><h1>get ready to serve</h1></div>");
  }

  setup() {
    $("#container").append(this.$readyToServe);
  }
  remove() {
    this.$readyToServe.remove();
  }
}
export default GetReady;
