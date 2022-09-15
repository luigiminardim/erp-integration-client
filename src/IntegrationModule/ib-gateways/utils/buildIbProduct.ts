import { Item } from "../../use-cases/UpdateItemsUsecase";
import { IbProduct } from "../dto/IbProduct";

export function buildIbProduct(item: Item): IbProduct {
  try {
    return {
      internal_code: item.internalCode,
      name: item.name,
      price: item.regularPrice,
      stock: item.qtdStock,
      visible: item.isVisible,
      barcodes: item.barCode ? [item.barCode] : undefined,
      promo_price: item.regularPromo?.price,
      promo_start_at: item.regularPromo?.endDate.toISOString(),
      promo_end_at: item.regularPromo?.endDate.toISOString(),
    };
  } catch (error) {
    console.error({ item, error: error });
    throw error;
  }
}
