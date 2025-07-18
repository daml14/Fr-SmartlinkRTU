import {  isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, signal, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { TranslateModule,TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme/theme.service';



@Component({
  selector: 'pages-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  isBrowser: boolean;
  isDarkMode = signal(true);
  

  public loginService = inject(LoginService);
  private themeService = inject(ThemeService);
  constructor(public router: Router, @Inject(PLATFORM_ID) private platformId: Object,private translate: TranslateService) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      
    }
    this.themeService.darkMode$.subscribe(mode =>{
      this.isDarkMode.set(mode);
    })
  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
     window.location.reload(); //change
     }
  }
  ngOnInit(): void {
    
  }


navigateTo(n: number): void {
    console.log(`Navegando con el índice: ${n}`);

    switch (n) {
        case 0:
            const id = 4;
            this.router.navigate([`/ViewSensors/${id}`]);
            break; 

        case 1:
           this.router.navigate([`/network-config`]);
            break; 

        case 2:
        case 3:
            this.router.navigate([`/build-page`]);
            break; 

        default:
           
            console.warn(`Índice de navegación no reconocido: ${n}`);
            break;
    }
}
}
