import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

  if(loginService.isAuthtenticated()){
    return router.navigateByUrl('/home')
  }else{
    return true;
  }
};
