
export let cart;
loadFromStorage();


export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  if(!cart){
    cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
    deliveryOptionId : '1' 
  },{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
    deliveryOptionId : '2'
  }];
  }
}


function saveData(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {

    let selectedItem;

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        selectedItem = cartItem
      }
    });
    if(selectedItem){
      selectedItem.quantity += 1;
    }else{
        cart.push({
          productId : productId ,
          quantity : 1,
          deliveryOptionId : '1'
        });
      }
      console.log(cart);
      saveData();
  }

  export function removeFromCart(productId){
    let newCart = [];
    cart.forEach((cartItem)=>{
      if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
    
    });
    cart = newCart;
    saveData();
  
  }

  export function updateDeliveryDate(productId,deliveryOptionId){
    let selectedItem;

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        selectedItem = cartItem
      }});
      selectedItem.deliveryOptionId = deliveryOptionId ; //updating the id from the webpage using eventListeners
    saveData();
  }
