export interface EiaResponse {
  response: { data: EiaDataItem[] };
}

export interface EiaDataItem {
  period: string;
  series: string;
  value: number;
}

export interface OilPrice {
  name: string;
  latestPrice: number;
  lastUpdate: string;
  history: { date: string; value: number }[];
}
export interface ProductionData {
  name: string;
  unit: string; 
  latestValue: string | number;
  lastUpdate: string; 
  history: { date: string; value: string | number }[];
}