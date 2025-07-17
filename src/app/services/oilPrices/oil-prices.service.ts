import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin } from 'rxjs';
import { EiaResponse, OilPrice, ProductionData } from '../../models/OilPrices';
import { environment } from '../../../environments/environment';

// Estrategias de búsqueda claras para cada tipo de llamada a la API
enum EiaApiStrategy {
  PRICE,
  US_PRODUCTION,
  GLOBAL_PRODUCTION,
}

@Injectable({ providedIn: 'root' })
export class OilPriceService {
  private apiKey = environment.EIA_API_KEY;
  private apiUrlBase = 'https://api.eia.gov/v2/';

  // IDs para cada serie de datos
  private wtiSeriesId = 'PET.RWTC.D';
  private brentSeriesId = 'PET.RBRTE.D';
  private usProductionSeriesId = 'COPRPUS';

  constructor(private http: HttpClient) { }

  // --- MÉTODOS PÚBLICOS ---

  /**
   * Obtiene los precios diarios de WTI y Brent.
   */
  public getOilPrices(): Observable<{ wti: OilPrice, brent: OilPrice }> {
    const wtiRequest = this.fetchData(EiaApiStrategy.PRICE, this.wtiSeriesId).pipe(
      map(response => this.processPriceData(response, 'WTI'))
    );
    const brentRequest = this.fetchData(EiaApiStrategy.PRICE, this.brentSeriesId).pipe(
      map(response => this.processPriceData(response, 'Brent'))
    );
    return forkJoin({ wti: wtiRequest, brent: brentRequest });
  }

  /**
   * Obtiene los datos de producción mensual de EE.UU. y Global.
   */
  public getProductionData(): Observable<{ usProduction: ProductionData, globalProduction: ProductionData }> {
    const usRequest = this.fetchData(EiaApiStrategy.US_PRODUCTION, this.usProductionSeriesId).pipe(
      map(response => this.processProductionData(response, 'Producción EE.UU.', 'Millones de barriles/día'))
    );
    const globalRequest = this.fetchData(EiaApiStrategy.GLOBAL_PRODUCTION, '').pipe( // El ID no es necesario aquí
      map(response => this.processProductionData(response, 'Producción Global (Refinados)', 'Miles de barriles/día'))
    );
    // Devolvemos el objeto con los nombres que el componente usará
    return forkJoin({ usProduction: usRequest, globalProduction: globalRequest });
  }


  // --- MOTOR CENTRAL DE BÚSQUEDA ---
  
  private fetchData(strategy: EiaApiStrategy, id: string): Observable<EiaResponse> {
    let fullUrl: string;
    let params: any;

    switch (strategy) {
      case EiaApiStrategy.PRICE:
        fullUrl = `${this.apiUrlBase}seriesid/${id}`;
        params = { api_key: this.apiKey, 'data[0]': 'value', 'sort[0][column]': 'period', 'sort[0][direction]': 'desc', length: '90' };
        break;

      case EiaApiStrategy.US_PRODUCTION:
        fullUrl = `${this.apiUrlBase}steo/data/`;
        params = { api_key: this.apiKey, 'facets[seriesId][]': id, frequency: 'monthly', 'data[0]': 'value', 'sort[0][column]': 'period', 'sort[0][direction]': 'desc', length: '36' };
        break;
        
      case EiaApiStrategy.GLOBAL_PRODUCTION:
        fullUrl = `${this.apiUrlBase}international/data/`;
        params = {
          api_key: this.apiKey,
          frequency: 'monthly',
          'facets[activityId][]': '1',
          'facets[productId][]': '57',
          'facets[countryRegionId][]': 'WORL',
          'facets[unit][]': 'TBPD',
          'data[0]': 'value',
          'sort[0][column]': 'period',
          'sort[0][direction]': 'desc',
          length: '36'
        };
        break;
    }
    return this.http.get<EiaResponse>(fullUrl, { params });
  }

  // --- PROCESADORES DE DATOS ---

  private processPriceData(response: EiaResponse, name: string): OilPrice {
    if (!response.response || !response.response.data || response.response.data.length === 0) {
      throw new Error(`No se encontraron datos para ${name}.`);
    }
    const data = response.response.data;
    return { name, latestPrice: Number(data[0].value), lastUpdate: data[0].period, history: data.map(item => ({ date: item.period, value: Number(item.value) })) };
  }

  private processProductionData(response: EiaResponse, name: string, unit: string): ProductionData {
    if (!response.response || !response.response.data || response.response.data.length === 0) {
      throw new Error(`No se encontraron datos para ${name}.`);
    }
    const data = response.response.data;
    return { name, unit, latestValue: Number(data[0].value), lastUpdate: data[0].period, history: data.map(item => ({ date: item.period, value: Number(item.value) })) };
  }
}