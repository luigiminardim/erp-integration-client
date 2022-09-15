import { CsvItemGateway as CsvItemsGateway } from "./erp-gateways/csv/CsvItemsGateway";
import { IbItemsGateway } from "./ib-gateways/IbUpdateItemsGateway";
import { UpdateItemsUsecase } from "./use-cases/UpdateItemsUsecase";

export function IntegrationModule() {
  const ibItemsGateway = new IbItemsGateway();
  const erpItemsGateway = new CsvItemsGateway();
  const updateItemsUsecase = new UpdateItemsUsecase(
    ibItemsGateway,
    erpItemsGateway
  );
  return {
    updateItemsUsecase,
  };
}
