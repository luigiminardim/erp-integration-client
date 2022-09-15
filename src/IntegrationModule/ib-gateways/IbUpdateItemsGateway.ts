import { IIbItemsGateway, Item } from "../use-cases/UpdateItemsUsecase";
import { IbProduct } from "./dto/IbProduct";
import { buildIbProduct } from "./utils/buildIbProduct";
import axios from "axios";

export class IbItemsGateway implements IIbItemsGateway {
  async updateItems(items: Item[]): Promise<void> {
    type IbPutProductsBody = {
      products: IbProduct[];
    };
    const body: IbPutProductsBody = {
      products: items.map((item) => buildIbProduct(item)),
    };
    const response = await axios({
      baseURL: "https://api.instabuy.com.br/store/",
      url: "products",
      method: "PUT",
      headers: {
        "api-key": "UgjUpN-xUTRXe_47Edmg94MqDb-3a2AJqo1iZPtJu8A",
      },
      data: body,
    });
    console.log(response.data);
  }
}
