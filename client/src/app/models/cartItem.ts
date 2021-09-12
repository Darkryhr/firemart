import { Product } from './product';

export interface CartItem {
  _id?: number;
  product?: string;
  amount?: number;
  price?: number;
}
