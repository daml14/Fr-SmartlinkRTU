import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { LinealComponent } from './Pages/graficos/lineal/lineal.component';
import { PageNotFoundComponent } from './Pages/error/page-not-found/page-not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { ViewSensorComponent } from './Pages/Tables/view-sensor/view-sensor.component';
import { FormSensorComponent } from './Pages/Forms/form-sensor/form-sensor.component';
import { BuildPageComponent } from './Pages/build-page/build-page.component';
import { Events } from 'leaflet';
import { AlarmsComponent } from './Pages/alarms/alarms.component';

export const routes: Routes = [
   
    {
      path: 'lineal',
      component: LinealComponent,
      canActivate: [authGuard]
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate:[authenticatedGuard]
    },
    {
      path: 'ViewSensors/:id',
      component: ViewSensorComponent,
      canActivate: [authGuard]
    },
    {
      path: 'FormSensor/:id',
      component: FormSensorComponent,
      canActivate: [authGuard]
    }, 
    {
      path: 'Alarms',
      component: AlarmsComponent,
      canActivate: [authGuard]
    }, 
    {
      path: 'build-page',
      component: BuildPageComponent,
      canActivate: [authGuard]
    },
    {
      path: '',
      redirectTo:'/login',
      pathMatch:'full',
    },
    {
      path: '**',
      component: PageNotFoundComponent
    },

  ];
