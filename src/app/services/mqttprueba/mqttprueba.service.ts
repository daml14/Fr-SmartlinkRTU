import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MqttpruebaService {

  constructor(private http:HttpClient) { }


motorControlOnOff(value:number){
    return this.http.get<any>(`http://192.168.68.10:3223/motorControlOnOff/${value}/M1i`);
  }

  motorControlVelocidad(velocidad:number){
    return this.http.get<any>(`http://192.168.68.10:3223/motorControlVelocidad/${velocidad}/M3o`)
  }


}
