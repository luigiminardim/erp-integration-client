export type IbProduct = {
  internal_code: string;
  name: string;
  price: number;
  visible: boolean;
  stock: number;
  barcodes: undefined | string[];
  promo_price: undefined | number;
  promo_start_at: undefined | string;
  promo_end_at: undefined | string;
};
