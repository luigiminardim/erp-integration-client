import { Item } from "../../use-cases/UpdateItemsUsecase";

const ptMonthToNumber = (month: string) => {
  const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];
  return months.indexOf(month) + 1;
};

export function buildItems(csvMatrix: string[][]): Item[] {
  const [headers = [], ...csvBody] = csvMatrix;
  const itemRecords: Record<string, string>[] = csvBody.map((row) =>
    row.reduce((acc, col, colIndex): Record<string, string> => {
      acc[headers[colIndex] ?? `${colIndex}`] = col;
      return acc;
    }, {} as Record<string, string>)
  );
  const items: Item[] = itemRecords.map((itemRecord): Item => {
    const regularPromo = extractPromo(itemRecord);
    return {
      internalCode: itemRecord["Código interno"] ?? "",
      barCode: itemRecord["Código de barras"] ?? "",
      name: itemRecord["Nome"] ?? "",
      regularPrice: Number(itemRecord["Preço regular"]) ?? 0,
      qtdStock: Number(itemRecord["estoque"]) ?? 0,
      isVisible: itemRecord["ativo"] === "true",
      regularPromo: regularPromo,
    };
  });
  return items;
}

function extractPromo(
  itemRecord: Record<string, string>
): Item["regularPromo"] {
  const price = Number(itemRecord["Promocao"]) ?? 0;
  const [day = "", ptMonth = "", year = ""] =
    itemRecord["Data termino promocao"]?.split("-") ?? [];
  const parsedDate = new Date(`${year}-${ptMonthToNumber(ptMonth)}-${day}`);
  const endDate = Number.isNaN(parsedDate.valueOf()) ? null : parsedDate;
  if (!price || !endDate) {
    return null;
  }
  return { price, endDate };
}
