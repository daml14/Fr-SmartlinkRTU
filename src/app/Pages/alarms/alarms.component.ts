  import { Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
  import { TranslateModule, TranslateService } from '@ngx-translate/core';
  import { LoginService } from '../../services/login/login.service';
  import { AlarmService } from '../../services/alarm/alarm.service';
  import { isPlatformBrowser } from '@angular/common';
  import { Router } from '@angular/router';
  import { NgxPaginationModule } from 'ngx-pagination';
  import { PdfExportService } from '../../services/pdf-export/pdf-export.service';
  import AlarmResponse from '../../models/AlarmResponse';
  


  @Component({
    selector: 'app-alarms',
    imports: [TranslateModule,NgxPaginationModule],
    templateUrl: './alarms.component.html',
    styleUrl: './alarms.component.css'
  })


  export class AlarmsComponent implements OnInit, OnDestroy{
    
    isBrowser: boolean;
    private pollingInterval: any;
    loginService = inject(LoginService);
    savedLang: string; 
  //paginacion
   itemsPerPage = 5;
   currentPage = 1;
   
    constructor(
      public alarmService: AlarmService,
      private translate: TranslateService,
      public router: Router,
      private  pdfExport:PdfExportService ,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
      
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {
      this.dataAlarms();
      this.pollingInterval = setInterval(() => {
        this.dataAlarms();
      }, 10000); // 10000 ms = 10 segundos
    
    }

    ngOnDestroy(): void {
      if (typeof window !== 'undefined') {
      window.location.reload(); //change
      }
        if (this.pollingInterval) {
      clearInterval(this.pollingInterval); 
    }
    }
      
    dataAlarms() {
      
        this.alarmService.viewAlarms().subscribe({
        next: (data) => {
      
          this.alarmService.alarms = data;
          this.currentPage = 1
          console.log(data)
        
        },
        error: (e) => console.log(e) 
      });
      
      }
    

    viewOilWell(id: number) {
      this.router.navigate([`/ViewSensors/${id}`]);
      window.location.reload();
    }

    
    toggleDone(alamr: any) {
      alamr.done = !alamr.done;
      console.log('Alarma actualizada:', alamr);

      
    }
    onPageChange(page: number) {
    this.currentPage = page;
    
  }
  exportToPdf() {
  const savedLang = (localStorage.getItem('language') as 'es' | 'en') || 'es';

  const alarmsToExport: AlarmResponse[] = this.alarmService.alarms.map(alarm => ({
    createdAt: alarm.createAt,
    oilWellName: alarm.oilwellName,
    sensorId: alarm.sensorId,
    alarmType: alarm.alarmType,
    alarmDescrip: alarm.alarmDescrip,
    alarmAction: alarm.alarmAction,
    alarmIsdone: alarm.alarmIsdone,
  }));

  this.pdfExport.exportAlarmsToPdf(alarmsToExport, savedLang);
}
}
  
