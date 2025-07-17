export interface ProductionData {
  name: string;
  unit: string; 
  latestValue: string | number;
  lastUpdate: string; 
  history: { date: string; value: string | number }[];
}