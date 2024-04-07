// Cart 
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//Close Cart 
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready(){
// Remove Item From Cart
    var reomveCartButtons = document.getElementsByClassName("fa-trash");
    console.log(reomveCartButtons)
    for (var i = 0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i]
        button.addEventListener("click", removeCartItem);
    }


// Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);
    }


// Add to Cart
var addCart = document.getElementsByClassName("fa-shopping-cart")
for (var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
}
// Buy button works
document.querySelector(".btn-buy").addEventListener("click", buyButtonClicked);
}

// Buy button
function buyButtonClicked(){
  alert("Your Order is placed")
  var cartContent = document.querySelector(".cart-content");
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

 // Remove Item From Cart
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}
// Quantity Changes 
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}
// Add to Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.querySelector(".product-title").textContent;
    var price = shopProducts.querySelector(".price").textContent;
    var productImg = shopProducts.querySelector(".product-img").src;
    addProductToCart(title, price, productImg);
  }
  
  function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.querySelector(".cart-content");
    var cartItemsNames = cartItems.querySelectorAll(".cart-product-title");
  
    for (var i = 0; i < cartItemsNames.length; i++) {
      if (cartItemsNames[i].textContent == title) {
        alert("You have already added this item to cart");
        return;
      }
    }
  
    var cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="fa fa-trash"></i>
    `;
  
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox.querySelector(".fa-trash").addEventListener("click", removeCartItem);
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
  
    // Update total
    updateTotal();
  }
  
  function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
  }
  
  function quantityChanged(event) {
    var input = event.target;
    if (input.value <= 0) {
      input.value = 1;
    }
    updateTotal();
  }
  
  function updateTotal() {
    var cartBoxes = document.querySelectorAll(".cart-box");
    var total = 0;
  
    for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.querySelector(".cart-price");
      var quantityElement = cartBox.querySelector(".cart-quantity");
      var price = parseFloat(priceElement.textContent.replace("$", ""));
      var quantity = parseInt(quantityElement.value);
      total += price * quantity;
    }
  
    // Round the total to two decimal places
    total = total.toFixed(2);
  
    var totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.textContent = "$" + total;
  }
