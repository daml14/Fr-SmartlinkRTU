import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { TimerService } from '../../services/timer/timer.service';


export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const timer = inject (TimerService)
 

  if(loginService.isAuthtenticated()){
    return true;
  }else{
    return router.navigate(['/login']).finally(()=>{
          window.location.reload()
    });
  }
};
