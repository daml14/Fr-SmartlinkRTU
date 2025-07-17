import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule,TranslateService } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Chart } from 'chart.js';
import { OilPrice, ProductionData } from '../../models/OilPrices';
import { OilPriceService } from '../../services/oilPrices/oil-prices.service';


// Component-specific Types and Interfaces
type ChartableDataType = 'wti' | 'brent' | 'usProduction' | 'globalProduction';

interface ChartDataConfig {
  label: string;
  data: number[];
  labels: string[];
  unit: 'currency' | 'millions' | 'thousands';
  borderColor: string;
}

@Component({
  selector: 'pages-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  public link: string = "https://lift.energy/es/";

  // Data properties
  public wtiPrice?: OilPrice;
  public brentPrice?: OilPrice;
  public usProduction?: ProductionData;
  public globalProduction?: ProductionData;
  public globalProductionInMillions: number = 0;

  // State properties for UI
  public pricesErrorMessage?: string;
  public productionErrorMessage?: string;
  public selectedChartData?: ChartDataConfig;
  
  // Chart.js instance
  public dynamicChart: Chart | undefined;

  // Lifecycle Hooks & Constructor
  constructor(
    private oilPriceService: OilPriceService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
   
  }


}