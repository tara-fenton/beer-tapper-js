class Customer {
  constructor(i, row, bar) {
    this.i = i;
    this.row = row;
    this.bar = bar;
    this.CUSTOMER_HEIGHT = 80;
    this.CUSTOMER_START_Y = 62;
    this.customerObj = {};
    this.randomArray = [
      "customer0.svg",
      "customer1.svg",
      "customer2.svg",
      "customer3.svg",
      "customer4.svg",
      "customer5.svg",
      "customer6.svg",
      "customer7.svg"
    ];
  }

  setup() {
    let customerID = this.randomCustomerImage();
    let customerDiv = this.createCustomerDiv(customerID);

    this.createCustomerObject(customerDiv);
  }
  randomCustomerImage() {
    let random = Math.floor(
      Math.random() * Math.floor(this.randomArray.length)
    );
    return random;
  }
  createCustomerDiv(customerID) {
    let $customerDiv = $(
      "<div class='customer'><img src='./images/" +
        this.randomArray[customerID] +
        "' /></div>"
    );
    $(".customers").append($customerDiv);
    this.customerCSS($customerDiv);

    return $customerDiv;
  }
  customerCSS(customerDiv) {
    customerDiv.attr("id", "data-customer-index" + this.i);
    customerDiv.css(
      "top",
      (this.CUSTOMER_HEIGHT / 2 + this.bar._padding) * this.row +
        this.CUSTOMER_START_Y +
        "px"
    );
    customerDiv.css("left", "100px");
  }
  createCustomerObject(customerDiv){
    this.customerObj.element = customerDiv;
    this.customerObj.movingForward = true;
  }
  get _customer() {
    return this.customerObj;
  }

  set _customer(customerObj) {
    return (this.customerObj = customerObj);
  }
}
export default Customer;
