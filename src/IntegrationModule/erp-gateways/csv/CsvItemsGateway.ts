import { IErpItemsGateway, Item } from "../../use-cases/UpdateItemsUsecase";
import { parse } from "csv-parse";
import fs from "fs";
import { buildItems } from "./buildItem";

export class CsvItemGateway implements IErpItemsGateway {
  async getItems(): Promise<Item[]> {
    const items = await new Promise<Item[]>((resolve, reject) => {
      const csvContent = fs.readFileSync(
        "/home/luigi/Desktop/Instabuy/erp-integration-client/data/items.csv"
      );
      parse(csvContent, { delimiter: ";" }, (err, unknownCsvMatrix) => {
        if (err) {
          reject(err);
        } else {
          const csvMatrix = unknownCsvMatrix as string[][];
          const items = buildItems(csvMatrix);
          resolve(items);
        }
      });
    });
    return items;
  }
}
