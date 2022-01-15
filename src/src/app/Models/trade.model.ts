export interface Trade {
  Id: string;
  AssetId: string;
  TradeDateTime: Date;
  Amount: number;
  Currency: string;
  Description: string;
  Status: string;
  Type?: "Sale" | "Buy";
  Note?: string;
  Source: string;
  Owner: string;
  ExtraDetails: any;
}
