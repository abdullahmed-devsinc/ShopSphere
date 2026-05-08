export const tax_rate = 0.05;
export function calculateTax(subTotal) {
  return subTotal * tax_rate;
}

export function calculateTotal(subTotal) {
  return subTotal + calculateTax(subTotal);
}
