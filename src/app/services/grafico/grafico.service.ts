import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  readonly DATA_SENSOR = `${environment.API_UTIL_URL}/smartLink/api/list/sensorData/7`;

  constructor(private http: HttpClient) {}

  private loginService = inject(LoginService)


  data : any;

  viewDataSensor(){
    return this.http.get<any>(this.DATA_SENSOR,this.loginService.getheaderBearer());
  }
}
