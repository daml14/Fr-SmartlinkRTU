import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoginService } from "../services/login/login.service";


export const AuthInterceptor:HttpInterceptorFn = (req:HttpRequest<unknown>,next:HttpHandlerFn) => {

    const token = localStorage.getItem('auth');

    console.log(token)
    const authReq = req.clone({
      setHeaders:{
        'Authorization' : `Bearer ${token}`,
      }
    });
  return next(authReq)
}
