import { inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Zone} from '../../models/Zone';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';



@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  readonly CREATE_ZONE_URL = `${environment.API_UTIL_URL}/smartLink/api/create/zone`;
  readonly VIEW_ZONES_URL = `${environment.API_UTIL_URL}/smartLink/api/list/zones`;
  readonly DELETE_ZONE_URL = `${environment.API_UTIL_URL}/smartLink/api/zone/`;

  zonas:any;
  private loginService = inject(LoginService);

  constructor(private _http: HttpClient) {}


  viewZones(){
    return this._http.get(this.VIEW_ZONES_URL,this.loginService.getheaderBearer());
  }

  createZones(zone: Zone){
    return this._http.post<Zone>(this.CREATE_ZONE_URL, zone,this.loginService.getheaderBearer());
  }

  deleteZones(id:number){
    return this._http.delete(`${this.DELETE_ZONE_URL}${id}`,this.loginService.getheaderBearer())
  }

}
