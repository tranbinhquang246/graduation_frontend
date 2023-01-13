export type CartPayload = {
  cartId: number;
  productId: number;
  quantity: number;
};

export type CardIDPayload = {
  cardId: number;
};

export type UpdateQuantityPayload = {
  id: number;
  quantity: number;
};

export type CardDetailIDPayload = {
  cardDetailId: number;
};
