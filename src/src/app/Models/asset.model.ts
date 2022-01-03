export interface Asset {
  Id: string;
  Name: string;
  ClientId: string;
  Source: string;
  Type: 'Unknown' | 'Crypto' | 'Stock' | 'Cash' | 'Fiat';
  Code: string;
  Exchange?: string;
  Currency: string;
  Balance: number;
  MarketIdentifiers?: any;
}
