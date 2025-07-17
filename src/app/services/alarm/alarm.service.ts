import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import {AlarmRespose} from '../../models/AlarmResponse'
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})

export class AlarmService {


    readonly VIEW_ALARMS_URL = `${environment.API_UTIL_URL}/smartLink/api/list/alarms`;
   

  alarms:any;

  private loginService = inject(LoginService);

  constructor(private _http: HttpClient) { }
  
  viewAlarms(){
    return this._http.get(this.VIEW_ALARMS_URL,this.loginService.getheaderBearer());
  }
}
