class BonusRound {

  constructor() {
    this.bonusDiv = $("<div id='bonus'></div>");
    this.bonusText = $("<h1 id='bonusRound'>BONUS ROUND</h1>");
    this.totalBeers = 6;
  }

  setup() {
    this.bonusDiv.append(this.bonusText);
    $("#container").append(this.bonusDiv);
    this.createBeers();
    this.moveBeers();
  }

  createBeers() {
    for (let i = 0; i < this.totalBeers; i++) {
      this.beersDiv = $("<div class='bonusBeers'></div>");
      this.beersDiv.attr("id", "bonusBeer"+ i);
      this.beersDiv.css("left", 110 + (i * 70)+"px");
      this.bonusDiv.append(this.beersDiv);
      // this.shake(i);
    }
  }

  shake(element) {
    setTimeout(function() {
      $("#bonusBeer" + element).effect("shake", { direction: "up", times: 4, distance: 10});
    }, 900 * element);
  }

  moveBeers(){
    // this.moveBeer(1,2)

    setTimeout(() => {
      this.moveBeer(1,2);
    }, 1000);

  }
  moveBeer(element1, element2){
    console.log(element1, element2);
    $("#bonusBeer" + element1).animate({
        top: "+=70",
      }, 300, function() {
        $("#bonusBeer" + element1).animate({
            left: "+=70", top: "-=70",
          }, 500, function() {
            //end animation
          })
      })

      $("#bonusBeer" + element2).animate({
          left: [500, 'easeInSine'],
        }, 800, function() {

        })
      // $("#bonusBeer" + element2).animate({
      //     right: '+=500',
      //   }, 500, function() {
      //   })
  }

}
export default BonusRound;
