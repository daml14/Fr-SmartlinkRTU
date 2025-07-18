import { Component, inject, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, signal,NgModule } from '@angular/core';
import { LinealComponent } from '../../graficos/lineal/lineal.component';
import { NgxGauge, NgxGaugeModule } from 'ngx-gauge';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SensorService } from '../../../services/sensor/sensor.service';
import { HeaderComponent } from '../../../layout/header/header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { MqttpruebaService } from '../../../services/mqttprueba/mqttprueba.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-view-sensor',
  imports: [LinealComponent, NgxGaugeModule,HeaderComponent,TranslateModule,NgxPaginationModule],
  templateUrl: './view-sensor.component.html',
  styleUrl: './view-sensor.component.css'
})
export class ViewSensorComponent implements OnInit, OnDestroy {

  public gaugeType = 'semi';
  public gaugeLabel = 'temp';
  public gaugeValue = 0
  public gaugeaddtexr = '°F';
  isBrowser: boolean;
  isDarkMode = false;
  gaugeKey = 0;

 //paginacion
   itemsPerPage = 5;
   currentPage = 1;

  //para prueba
  isOn = true;
  isLock = true;
  velocidad = 0;
  valueSensor = signal(0);

  actRouter = inject(ActivatedRoute);
  sensorService = inject(SensorService);
  router = inject(Router);

  std: any[] = []
  isModalOpen = false;


  @Input('id') oilWellId!: number


  constructor(@Inject(PLATFORM_ID) private platformId: Object,private translate:TranslateService,private mqtt:MqttpruebaService,private themeService:ThemeService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    this.themeService.darkMode$.subscribe(mode => {
    this.isDarkMode = mode;
    this.gaugeKey++;
  });
    setInterval(() => {
      this.viewDataSensor(7);
    }, 500);
    this.viewSensors(this.oilWellId)
  }

  viewSensors(id: number) {
    this.sensorService.viewSensor(id).subscribe({
      next: (data) => {
        this.sensorService.sensors = data;
        console.log(data)
      }
    })
  }
  getGaugeSize(): number {
  if (window.innerWidth < 640) return 100;   // móviles
  if (window.innerWidth < 1280) return 130;  // tablets
  return 160;                                // escritorio
}

  viewDataSensor(id: number) {
      this.sensorService.viewDataSensor(id).subscribe({
        next: (data) => {
          let long = data.length
          for (let i = 0; i < long; i++) {
            let num = data[i]['data'] * 10
            this.valueSensor.set(Math.round(num));
          }
        }
      })
  }
  ngOnDestroy(): void {
      console.log('destruido')
      if(typeof window !== 'undefined'){
        window.location.reload(); //change
      }
  }
   exit() { 
    const isDark = this.themeService['_darkMode'].value;
         this.translate.get(['Swal.TitleExit','Swal.Yes',]).subscribe((t:any)=>{
             Swal.fire({
               title: t['Swal.TitleExit'],
               icon:'question',
               draggable:true,
               confirmButtonColor:'green',
               denyButtonText:'NO',
               confirmButtonText:t['Swal.Yes'],
               showDenyButton : true,
               denyButtonColor : 'red',
               backdrop: 'rgba(155, 155, 155, 0.9)',
               background: isDark ? '#252525' : '#ffffff',
               color: isDark ? '#ffffff' : '#000000',
               allowOutsideClick: false, 
               allowEscapeKey: false,    
               allowEnterKey: false, 
             }).then(rs=>{
               if(rs.isConfirmed){
                 this.router.navigate(['/home'])
               }
             })
           }) 
    }

    openModal(){
      this.isModalOpen=true;
    }
    closeModal(){
      this.isModalOpen=false ;
      this.isLock=true;
    }
aumentar() {
  if (this.velocidad < 100) this.velocidad += 10;
  this.mqtt.motorControlVelocidad(this.velocidad*10).subscribe({
    next: () =>{
      console.log("david es un maton")
    }
  })
}

disminuir() {
  if (this.velocidad > 0) this.velocidad -= 10;
   this.mqtt.motorControlVelocidad(this.velocidad*10).subscribe({
    next: () =>{
      console.log("david es un maton")
    }
  })
}
toggleEstado(){
  this.isOn=true;
}
desbloquear(){
const isDark = this.themeService['_darkMode'].value;
    this.translate.get([
          'Swal.Unlock','Swal.UnlockT']).subscribe((t:any) =>{
          Swal.fire({
            title:t['Swal.Unlock'],
            icon:'warning',
            text:t['Swal.UnlockT'],
            background: isDark ? '#252525' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            backdrop: `rgba(155,155,155,0.9)`,
            allowOutsideClick: false, 
            allowEscapeKey: false,    
            allowEnterKey: false, 
            confirmButtonColor:`orange`,
            customClass: {
            popup: 'text-justify'
}
          }).then(rs=>{
            if(rs.isConfirmed){
              this.isLock=false;
  
            }
          })
        })
}
apagar(n:number){
  this.mqtt.motorControlOnOff(n).subscribe({
        next: (data) => {
          console.log("apagado")
        }
      })
}
prender(n:number){
this.mqtt.motorControlOnOff(n).subscribe({
        next: (data) => {
          console.log("encendido")
        }
      })
    }
        onPageChange(page: number) {
    this.currentPage = page;
    
  }
}
