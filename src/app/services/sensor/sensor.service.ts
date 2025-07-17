import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';
import Sensor from '../../models/Sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http:HttpClient){ }

  sensors = [];
  dataSensors = [];

  private loginService = inject(LoginService);

  readonly VIEW_SENSOR_URL=`${environment.API_UTIL_URL}/smartLink/api/list/sensors/`;
  readonly DATA_SENSOR_URL = `${environment.API_UTIL_URL}/smartLink/api/list/sensorData/`;
  readonly SENSOR_CREATE_URL = `${environment.API_UTIL_URL}/smartLink/api/create/sensor`;

  viewSensor(id:number){
    return this.http.get<any>(`${this.VIEW_SENSOR_URL}${id}`,this.loginService.getheaderBearer());
  }

  viewDataSensor(id:number){
    return this.http.get<any>(`${this.DATA_SENSOR_URL}${id}`,this.loginService.getheaderBearer());
  }

  createSensor(sensor:Sensor){
    return this.http.post<Sensor>(`${this.SENSOR_CREATE_URL}`,sensor,this.loginService.getheaderBearer())
  }


}
