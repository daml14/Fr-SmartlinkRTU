import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly LOGIN_URL=`${environment.API_AUTH_URL}/authentication/login`;
  readonly LOGOUT_URL = `${environment.API_AUTH_URL}/authentication/logOut`
  private tokenKey = 'auth';
  
  payload:any
  
  constructor(private http:HttpClient) { }



  login(user:string,pwd:string) : Observable<any>{
    let b64=window.btoa(`${user}:${pwd}`);
    let head = new HttpHeaders({
      'Authorization':`Basic ${b64}`,
    });

    return this.http.post<any>(this.LOGIN_URL,null,{headers:head}).pipe(
      tap(rs=>{
        if(rs.token){
          if(rs.token !=='INTERNAL: Sesion iniciada.'){
            this.setToken(rs.token);
          }else{
            console.log(`Active Sesion`)
          }
        }
        else{
          console.log(`no token available`);
        }
      })
    );
  }

  public getheaderBearer() {
    let token = ''
    if(typeof window !== 'undefined'){
      token = localStorage.getItem("auth");
    }
      return {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Content-type':'application/json',
        }),
      };
  }

  private setToken(token:string):void{
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken():string {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(this.tokenKey);
    }else{
      return 'hola';
    }
  }

  isAuthtenticated():boolean{
    const token = this.getToken();
    if(!token){
      return false;
    }else if(typeof window !== 'undefined'){
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now()< exp;
    }
    return false;
  }


  getInfo(info):string{
    const token = this.getToken();
    if(typeof window !=='undefined'){
      this.payload = JSON.parse(window.atob(token.split('.')[1]));
      const name = this.payload[info]
      return name;
    }
    return '';
  }

  logout(){
      return this.http.post<any>(this.LOGOUT_URL, null, this.getheaderBearer()).pipe(
        tap(rs => {
          console.log(`LogOut: ${rs}`)
          if(typeof window !== 'undefined'){
            localStorage.removeItem(`${this.tokenKey}`);
            window.location.reload()
          }
        })
      );
  }
}
