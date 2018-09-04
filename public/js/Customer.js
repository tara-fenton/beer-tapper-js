import Bar from "./Bar.js";

class Customer {

  constructor (i) {
    this.i = i;
    this.CUSTOMER_AMOUNT = 4;
    this.CUSTOMER_HEIGHT = 80;
    this.CUSTOMER_WIDTH = 40;
    this.CUSTOMER_START_Y = 100;
    // this.customersObj = {};
    this.bar = new Bar();
  }

  setup() {
    let $customerDiv = $("<div class='customer'></div>");
    $(".customers").append($customerDiv);
    $customerDiv.attr("id", "data-customer-index" + this.i);
    $customerDiv.css("top", (this.CUSTOMER_HEIGHT / 2 + this.bar._padding) * this.i + this.CUSTOMER_START_Y +"px");
    $customerDiv.css("left", "30px");
    // customer object
    var customerObj = {};
    // customerObj.id = "data-customer-index" + i;
    // customerObj.element = $customerDiv;
    // customerObj.movingForward = true;
    // //customerObj.drinking = false;
    // customerObj.barRow = i;
    // customersObj[i] = customerObj;
  }
}
export default Customer;
