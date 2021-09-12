import { Product } from './product';

export interface CartItem {
  _id?: number;
  product?: Product;
  amount?: number;
  price?: number;
}
