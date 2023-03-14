fetch("menu.json")
.then(res => res.json())
.then(data => createMenu(data))


function createMenu(data) {
    var menuTemplate = document.getElementById('menu-template');
    var output = "";

    for (let i=0; i<data.products.length; i++){
        if (i == 0){
            output += `<h3>${data.products[i].category}</h3>`
        }
        else if (data.products[i].category !== data.products[i-1].category){
            output += `<hr /><h3>${data.products[i].category}</h3>`
        }
        output += `
            <div class="product-box">
                <img class="product-img" src="${data.products[i].imgUrl}" alt="glazed-donut">
                <h2 class="product-title">${data.products[i].name}</h2>
                <span class="price">${data.products[i].price}</span>
                <i class="fa fa-bag-shopping add-cart"></i>
            </div>
        `
    }
    menuTemplate.innerHTML = output;

    // add event listener to each product box
    addCartClass = document.getElementsByClassName('add-cart');
    for (let i=0; i<addCartClass.length; i++){
        menuTemplate.getElementsByClassName('add-cart')[i].addEventListener('click', addCartClicked)
    }
    
    
}


// Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready()
}

// Making Function
function ready() {
    // remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i=0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    // quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');    
    for (var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('click', quantityChange)
    }
    // add to cart
    var addCart = document.getElementsByClassName('add-cart')
    console.log(addCart)
    for (var i=0; i <addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    // buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// buy button
function buyButtonClicked(){
    alert('Your order has been placed! Thank you for ordering');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// function to remove items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// updates total upon quantity changes
function quantityChange(event){
    var input = event.target;
    if (!input.value || input.value <= 0){
        input.value = 1
    }
    updateTotal();
}

// getting item info of product that was clicked
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

// add to cart
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i=0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("You have already added this item to your cart!");
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
        <!-- Remove Cart -->
        <i class="fa-sharp fa-solid fa-trash-can cart-remove"></i>
    `
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChange);
}




// update total 
function updateTotal(){
    // var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));  
        var quantity = quantityElement.value
        total += price * quantity;
    }
    // if price contains cents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}
