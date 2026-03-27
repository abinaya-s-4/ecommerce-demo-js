import {cart, removeFromCart, updateDeliveryDate} from '../../data/cart.js';
import { deliveryOption , getDeliveryOption} from '../../data/deliveryOptions.js';
import {product,getProduct} from '../../data/products.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){

  let cartHTML = '';
  cart.forEach((cartItem)=>{
     const productId = cartItem.productId ;
     const matchingProduct = getProduct(productId);

      // delivery date rendering
      const deliveryOptionId = cartItem.deliveryOptionId;

      const deliveryDateId = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add( deliveryDateId.days, 'days');
        const deliveryString = deliveryDate.format('dddd, MMMM, D');

    cartHTML += ` <div class="cart-item-container js-remove-cart-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${deliveryString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ₹${matchingProduct.price}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = '${matchingProduct.id}'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
          </div>
        </div>
      </div>
    </div>`;
    


    });
    document.querySelector('.js-cart-summary').innerHTML = cartHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click',() =>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-remove-cart-${productId}`);
        container.remove();

        renderPaymentSummary();
      });

    });
    
    function deliveryOptionHTML(matchingProduct, cartItem){
      let deliveryOptionHTML = ``;

      deliveryOption.forEach((deliveryItem) => {
        const today = dayjs();
        const deliveryDate = today.add( deliveryItem.days, 'days');
        const deliveryString = deliveryDate.format('dddd, MMMM, D');
        const priceString = deliveryItem.price === 0
          ? 'FREE-'
          : `₹${(deliveryItem.price)} -`;

          const ischecked = deliveryItem.id === cartItem.deliveryOptionId; // value will be true or false
          deliveryOptionHTML += `
          
          <div class="delivery-option js-checked-id" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryItem.id}" >
            <input type="radio" ${ischecked ? 'checked' : '' } 
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${deliveryString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
          `
          
      });
      return deliveryOptionHTML;
    }
    // fun to save data frm webpage fr the marked id in delivery
    document.querySelectorAll('.js-checked-id').forEach((option) =>{
      
      option.addEventListener('click', () =>{
        const {productId, deliveryOptionId} = option.dataset; 
        updateDeliveryDate(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();  
      });
      // we get productId and deliveyOptionId for that specific html element from all the html elements generated fr diff dates with diff ids, we are getting dataset value fr the specific element that is clicked.
    });
}

renderOrderSummary();


  

