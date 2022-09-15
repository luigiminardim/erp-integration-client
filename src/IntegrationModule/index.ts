import { CsvItemGateway as CsvItemsGateway } from "./erp-gateways/csv/CsvItemsGateway";
import { IbItemsGateway } from "./ib-gateways/IbUpdateItemsGateway";
import { UpdateItemsUsecase } from "./use-cases/UpdateItemsUsecase";

export function IntegrationModule(filePath: string, appVersion: string) {
  const ibItemsGateway = new IbItemsGateway(appVersion);
  const erpItemsGateway = new CsvItemsGateway(filePath);
  const updateItemsUsecase = new UpdateItemsUsecase(
    ibItemsGateway,
    erpItemsGateway
  );
  return {
    updateItemsUsecase,
  };
}
