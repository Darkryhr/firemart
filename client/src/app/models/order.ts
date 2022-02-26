export interface Order {
  customer_id: string;
  cart_id: string;
  price: number;
  address: string;
  deliveryDate: Date;
  orderedAt: Date;
  creditCardDigits: number;
}
