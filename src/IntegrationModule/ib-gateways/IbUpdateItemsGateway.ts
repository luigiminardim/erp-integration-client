import { IIbItemsGateway, Item } from "../use-cases/UpdateItemsUsecase";
import { IbProduct } from "./dto/IbProduct";
import { buildIbProduct } from "./utils/buildIbProduct";
import axios from "axios";

export class IbItemsGateway implements IIbItemsGateway {
  constructor(private appVersion: string) {

  }

  async updateItems(items: Item[]): Promise<void> {
    type IbPutProductsBody = {
      products: IbProduct[];
    };
    const body: IbPutProductsBody = {
      products: items.map((item) => buildIbProduct(item)),
    };
    try {
      const response = await axios({
        baseURL: "https://api.instabuy.com.br/store/",
        url: "products",
        method: "PUT",
        headers: {
          "api-key": "qlWyl0JuTMGtRv0HV6k5XvPp9o9OBFZm9smVR-BSvPQ",
          "app-version": this.appVersion
        },
        data: body,
      });
      console.log(response.data);
    } catch (error) {
      console.log("axios error:", error);
    }
  }
}
