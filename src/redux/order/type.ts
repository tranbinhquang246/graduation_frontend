export type OrderPayload = {
  cartId: number;
  totalOrder: number;
  deliveryAddress: string;
  products: object[];
};
export type SetOrderedPayload = {
  orderedData: [];
};
