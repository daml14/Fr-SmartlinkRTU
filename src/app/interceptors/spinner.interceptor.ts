import { finalize } from "rxjs";
import { SpinnerloadService } from "../services/spinnerload/spinnerload.service";
import {inject} from '@angular/core';
import { HttpInterceptorFn } from "@angular/common/http";
import { Location } from '@angular/common';

export const SpinnerInterceptor: HttpInterceptorFn = (req , next) => {
  const spinnerLoad = inject(SpinnerloadService);
  const location = inject(Location);

  let url = location.path();
  let comp = url.substring(0,13);
  
  if(comp !== `/ViewSensors/` && comp !==`/Alarms`){
    spinnerLoad.Show();
  }
  return next(req).pipe(
    finalize(()=>{
      spinnerLoad.Hide();
    })
  )
}
