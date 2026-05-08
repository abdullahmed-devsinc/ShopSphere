import { useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartSubTotal,
  selectCartCount,
} from '../Features/Cart/cartSlice';
import { calculateTax, calculateTotal } from '../utils/tax';

export function useCartSummary() {
  const items = useSelector(selectCartItems);
  const subTotal = useSelector(selectCartSubTotal);
  const cartCount = useSelector(selectCartCount);

  return {
    items,
    subTotal,
    cartCount,
    taxAmount: calculateTax(subTotal),
    grandTotal: calculateTotal(subTotal),
  };
}
