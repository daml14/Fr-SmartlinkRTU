import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import field from '../../models/Field';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class FieldService {


  readonly VIEW_FIELD_URL = `${environment.API_UTIL_URL}/smartLink/api/list/fields`;
  readonly CREATE_FIELD_URL = `${environment.API_UTIL_URL}/smartLink/api/create/field`;
  readonly DELETE_FIELD_URL = `${environment.API_UTIL_URL}/smartLink/api/field/`;

  private loginService = inject(LoginService);

  constructor(private http:HttpClient) {
    this.fields = [];
  }

  fields: any;

  viewFields(){
    return this.http.get<field>(this.VIEW_FIELD_URL,this.loginService.getheaderBearer());
  }

  createField(field:field){
   return this.http.post<field>(this.CREATE_FIELD_URL, field,this.loginService.getheaderBearer());
  }

  deleteField(id:number){
    return this.http.delete(`${this.DELETE_FIELD_URL}${id}`,this.loginService.getheaderBearer());
  }

}
