export const cart =[];
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
          quantity : 1
        });
      }
      console.log(cart);
  };
