function Cart(localStorageKey){
  const cart = {
  cartItems : undefined,
  loadFromStorage (){
  this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
   
  if(!this.cartItems){
    this.cartItems = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2,
    deliveryOptionId : '1' 
  },{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 1,
    deliveryOptionId : '2'
  }];
  }
},

saveData(){
  localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
},

addToCart(productId) {

    let selectedItem;

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        selectedItem = cartItem
      }
    });
    if(selectedItem){
      selectedItem.quantity += 1;
    }else{
        this.cartItems.push({
          productId : productId ,
          quantity : 1,
          deliveryOptionId : '1'
        });
      }
      console.log(cart);
      this.saveData();
  },

  removeFromCart(productId){
    let newCart = [];
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
    
    });
    this.cartItems = newCart;
    this.saveData();
  
  },

   updateDeliveryDate(productId,deliveryOptionId){
    let selectedItem;

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        selectedItem = cartItem
      }});
      selectedItem.deliveryOptionId = deliveryOptionId ; //updating the id from the webpage using eventListeners
    this.saveData();
  }

};
}
const cart = Cart('cart-oop');
const buisnesscart = Cart('cart-buisness');

cart.loadFromStorage();


