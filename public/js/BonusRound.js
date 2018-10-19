class BonusRound {
  constructor() {
    this.bonusDiv = $("<div id='bonus'></div>");
    this.bonusText = $("<h1 id='bonusRound'>BONUS ROUND</h1>");
    this.totalBeers = 6;
    // this.array = [[2, 5]];
    this.count = 0;

    this.array = [[2, 1], [5, 4]];
    this.moveBeers = this.moveBeers.bind(this);
    // this.array = this.array.bind(this);
  }

  setup() {
    this.bonusDiv.append(this.bonusText);
    $("#container").append(this.bonusDiv);
    this.createBeers();
    // this.moveBeers();
    setTimeout(() => this.moveBeers(), 100);
    // setTimeout(function() {
    //   this.moveBeers();
    // }, 900 * this.totalBeers);
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
    console.log("this is happening");
    // for (let i = 0; i < this.array.length; i++) {
    // console.log(this.array[i][0], this.array[i][1]);

    console.log("count", this.count);
    console.log("count", this.array.length);
    if (this.count < this.array.length) {
      this.moveBeerLeft(this.array[this.count][0]);
      this.moveBeerDown(this.array[this.count][1]);
      console.log("this.array[this.count][0]", this.array[this.count][0]);
      console.log(this.array[this.count][1]);
      console.log("setTimeout");
      // moveBeers();
      this.count++;
      this.moveBeers()
      // setTimeout(() => this.moveBeers(), 900);
    }
    // this.count = count;
    // }
    // // this.moveBeer(1,2)
    //
    // setTimeout(() => {
    //   this.moveBeer(1,2);
    // }, 1000);
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
  // moveBeer(element1, element2){
  //   console.log(element1, element2);
  //   $("#bonusBeer" + element1).animate({
  //       top: "+=70",
  //     }, 300, function() {
  //       $("#bonusBeer" + element1).animate({
  //           left: "+=70", top: "-=70",
  //         }, 500, function() {
  //           //end animation
  //         })
  //     })
  //
  //     $("#bonusBeer" + element2).animate({
  //         left: [500, 'easeInSine'],
  //       }, 800, function() {
  //
  //       })
  //     // $("#bonusBeer" + element2).animate({
  //     //     right: '+=500',
  //     //   }, 500, function() {
  //     //   })
  // }
}
export default BonusRound;
