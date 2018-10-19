class BonusRound {
  constructor() {
    this.bonusDiv = $("<div id='bonus'></div>");
    this.bonusText = $("<h1 id='bonusRound'>BONUS ROUND</h1>");
    this.totalBeers = 6;
    this.count = 0;
    this.array = [[2, 1], [5, 4]];
    this.moveBeers = this.moveBeers.bind(this);
  }

  setup() {
    this.bonusDiv.append(this.bonusText);
    $("#container").append(this.bonusDiv);
    this.createBeers();
    setTimeout(() => this.moveBeers(), 100);
  }

  createBeers() {
    for (let i = 0; i < this.totalBeers; i++) {
      this.beersDiv = $("<div class='bonusBeers'></div>");
      this.beersDiv.attr("id", "bonusBeer" + i);
      this.beersDiv.css("left", 110 + i * 70 + "px");
      this.bonusDiv.append(this.beersDiv);
      // this.shake(i);
    }
  }

  shake(element) {
    setTimeout(function() {
      $("#bonusBeer" + element).effect("shake", {
        direction: "up",
        times: 4,
        distance: 10
      });
    }, 900 * element);
  }

  moveBeers() {
    if (this.count < this.array.length) {
      this.moveBeerLeft(this.array[this.count][0]);
      this.moveBeerDown(this.array[this.count][1]);
      this.count++;
      this.moveBeers()
      // setTimeout(() => this.moveBeers(), 900);
    }
  }
  moveBeerDown(element) {
    let count = this.count;
    let array = this.array;
    let moveBeers = this.moveBeers;
    $("#bonusBeer" + element).animate(
      {
        top: "+=70"
      },
      300,
      function() {
        $("#bonusBeer" + element).animate(
          {
            left: "+=70",
            top: "-=70"
          },
          500,
          function() {
            //end animation
          }
        );
      }
    );
  }
  moveBeerLeft(element) {
    $("#bonusBeer" + element).animate(
      {
        left: ["-=70", "easeInSine"]
      },
      800,
      function() {}
    );
  }
  
}
export default BonusRound;
