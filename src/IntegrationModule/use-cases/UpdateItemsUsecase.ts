export type Item = {
  internalCode: string;
  barCode: null | string;
  name: string;
  qtdStock: number;
  isVisible: boolean;
  regularPrice: number;
  regularPromo: null | {
    price: number;
    endDate: Date;
  };
};

export interface IErpItemsGateway {
  getItems(): Promise<Item[]>;
}

export interface IIbItemsGateway {
  updateItems(items: Item[]): Promise<void>;
}

export class UpdateItemsUsecase {
  constructor(
    private ibGateway: IIbItemsGateway,
    private erpGateway: IErpItemsGateway
  ) {}

  async execute() {
    console.log("Running UpdateItemsUsecase");
    const erpItems = await this.erpGateway.getItems();
    await this.ibGateway.updateItems(erpItems);
  }
}
