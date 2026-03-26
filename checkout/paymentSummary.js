import {cart} from '../../data/cart.js'
import { getProduct } from '../../data/products.js';

export function renderPaymentSummary(){
  let productprice = 0;
  cart.forEach((cartItem) =>{
    const product = getProduct(cartItem.productId);
    productprice += product.price * cartItem.quantity;
    
  });
}