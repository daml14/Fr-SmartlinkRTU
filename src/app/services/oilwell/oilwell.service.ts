import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Oil from '../../models/Oil';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class OilwellService {

  readonly VIEW_OILWELL =`${environment.API_UTIL_URL}/smartLink/api/list/oilWells`;
  readonly CREATE_OILWELL=`${environment.API_UTIL_URL}/smartLink/api/create/oilWell`;
  readonly DELETE_OILWELL=`${environment.API_UTIL_URL}/smartLink/api/oilWell/`;

  private loginService = inject(LoginService);

  Oils:any;

  count!:number;


  constructor(private http:HttpClient) {
    this.Oils = [];
  }

  viewOilWell(){
    return this.http.get<any>(this.VIEW_OILWELL, this.loginService.getheaderBearer());
  }

  createOilWell(oil:Oil){
    return this.http.post<Oil>(this.CREATE_OILWELL, oil,this.loginService.getheaderBearer());
  }

  deleteOilWell(id:number){
    return this.http.delete(`${this.DELETE_OILWELL}${id}`, this.loginService.getheaderBearer());
  }

}
