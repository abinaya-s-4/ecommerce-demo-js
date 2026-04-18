//create an array to contain all our orders
export const orders = JSON.parse(localStorage.getItem('orders')) || [] ;

export function addOrder(order){
  orders.unshift(order); // adds order in front of the array instead of back
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}