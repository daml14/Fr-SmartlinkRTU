import { Component, Inject,PLATFORM_ID, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { SensorService } from '../../../services/sensor/sensor.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import Sensor from '../../../models/Sensor';
import { isPlatformBrowser } from '@angular/common';
import { TimerService } from '../../../services/timer/timer.service';
import { TranslateModule,TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-form-sensor',
  imports: [SweetAlert2Module,ReactiveFormsModule,TranslateModule ],
  templateUrl: './form-sensor.component.html',
  styleUrl: './form-sensor.component.css'
})

export class FormSensorComponent implements OnInit, OnDestroy {

  TypeOfSensors: { nombre: string }[] = [
  { nombre: 'Sensor de Carga y Posicion' },
  { nombre: 'Medidor de Gases' },
  { nombre: 'Sensor de Inclinacion de barra' },
  { nombre: 'Medidor de Emboladas' },
  { nombre: 'Medidor de Vibracion' },
  { nombre: 'Sensor de Presion' },
  { nombre: 'Sensor de Caudal' },
  { nombre: 'Sensor de Temperatura' }
];

    
    formSensors: FormGroup;
    sensorName: FormControl;
    sensorType: FormControl;
    sensorMinValue: FormControl;
    sensorMaxValue: FormControl;
    sensorPlcId: FormControl;
    unitId: FormControl;
    isBrowser : boolean;
    selectedLanguage: string;

    private timerService = inject(TimerService);
    constructor( public router: Router,public sensorService:SensorService, @Inject(PLATFORM_ID) private platformId:Object,private translate: TranslateService,private themeService:ThemeService){

    const savedLang = localStorage.getItem('language');
    const langToUse = savedLang || this.translate.defaultLang || 'en';
    this.selectedLanguage = langToUse;
    this.translate.use(langToUse); 

    this.sensorName = new FormControl('',Validators['required']);
    this.sensorType = new FormControl('', Validators['required']);
    this.sensorMinValue = new FormControl('',Validators['required']);
    this.sensorMaxValue = new FormControl('', Validators['required']);
    this.sensorPlcId = new FormControl('', Validators['required']);
    this.unitId = new FormControl('', Validators['required']);

    this.formSensors = new FormGroup({
     sensorName : this.sensorName,
     sensorType : this.sensorType,
     sensorMinValue : this.sensorMinValue,
     sensorMaxValue : this.sensorMaxValue,
     sensorPlcId : this.sensorPlcId,
     unitId : this.unitId
    })
    this.isBrowser = isPlatformBrowser(this.platformId)
  }
  @Input('id') oilWellId!: number


  ngOnInit(): void {
      console.log(this.oilWellId);
  }


  createSensor(){
     const isDark = this.themeService['_darkMode'].value;
    let response:Sensor = {
    
    "oilWellId" : this.oilWellId,
    "sensorName" : this.sensorName.value,
    "sensorType" : this.sensorType.value,
    "sensorMinValue" : this.sensorMinValue.value,
    "sensorMaxValue" : this.sensorMaxValue.value,
    "sensorPlcId" : this.sensorPlcId.value,
    "unitId" : this.unitId.value

    }
  
      if(this.isBrowser){
         this.sensorService.createSensor(response).subscribe({
           next:(data)=>{
             this.translate.get(['Swal.SuccessT']).subscribe((t: any) => {
                       Swal.fire({
                         title: t['Swal.SuccessT'],
                         icon: 'success',
                         confirmButtonColor: 'green',
                         background: isDark ? '#252525' : '#ffffff',
                         color: isDark ? '#ffffff' : '#000000',
                         allowOutsideClick: false,
                         backdrop: 'rgba(155, 155, 155, 0.9)'
                       }).then((rs) => {
                         if (rs.isConfirmed) {
                           this.router.navigate(['/ViewOilWell']);
                         }
                       });
                     });
           },  error: (e) => {
                     Swal.fire({
                       title: `Error ${e['status']}`,
                       icon: 'error',
                       background: isDark ? '#252525' : '#ffffff',
                       color: isDark ? '#ffffff' : '#000000',
                       draggable: true,
                       confirmButtonColor: 'red',
                       backdrop: 'rgba(155, 155, 155, 0.9)'
                     });
                   }
         })
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
           background: isDark ? '#252525' : '#ffffff',
           color: isDark ? '#ffffff' : '#000000',
           backdrop: 'rgba(155, 155, 155, 0.9)',
           allowOutsideClick: false, 
           allowEscapeKey: false,    
           allowEnterKey: false, 
         }).then(rs=>{
           if(rs.isConfirmed){
             this.router.navigate([`/ViewSensors/${this.oilWellId}`])
           }
         })
       })
  }
  ngOnDestroy(): void {
    console.log('destruido')
    if(typeof window !== 'undefined'){
      window.location.reload(); //change 
    }
}
}
