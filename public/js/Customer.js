class Customer {

  constructor (i, bar) {
    this.i = i;
    this.bar = bar;
    this.CUSTOMER_AMOUNT = 4;
    this.CUSTOMER_HEIGHT = 80;
    this.CUSTOMER_WIDTH = 40;
    this.CUSTOMER_START_Y = 100;
    this.customerObj = {};
  }

  setup() {
    let $customerDiv = $("<div class='customer'></div>");
    $(".customers").append($customerDiv);
    $customerDiv.attr("id", "data-customer-index" + this.i);
    $customerDiv.css("top", (this.CUSTOMER_HEIGHT / 2 + this.bar._padding) * this.i + this.CUSTOMER_START_Y +"px");
    $customerDiv.css("left", "30px");
    // customer object

    this.customerObj.element = $customerDiv;
    this.customerObj.movingForward = true;
    // //customerObj.drinking = false;
    // customerObj.barRow = i;
    // customersObj[i] = customerObj;

  }
  
  get _customer() {
    return this.customerObj;
  }

  set _customer(customerObj) {
    return (this.customerObj = customerObj);
  }
}
export default Customer;
