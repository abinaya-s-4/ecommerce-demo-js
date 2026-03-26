export function getDeliveryOption(deliveryOptionId){
  let deliveryDateId;
  deliveryOption.forEach((option) => {
        if(deliveryOptionId === option.id){
          deliveryDateId = option;
        }});
        return deliveryDateId || deliveryOption[0];
   }

export const deliveryOption  =[{
  id : '1',
  price : 700,
  days : 1
},{
  id : '2',
  price:500,
  days :3
},{
  id : '3',
  price : 0,
  days : 7
}];