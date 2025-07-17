import { inject, Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { signal, computed } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})

export class TimerService {

  private timerSesion = false;
  private tiempoRestanteMs = signal(0); 
  public minLeft = computed(() => Math.floor(this.tiempoRestanteMs() / 60000));
  public secLeft = computed(() => Math.floor((this.tiempoRestanteMs() % 60000) / 1000));
  public formattedMinLeft = computed(() =>
  this.minLeft().toString().padStart(2, '0') 
  );

  public formattedSecLeft = computed(() =>
    this.secLeft().toString().padStart(2, '0') 
  );

  private translate = inject(TranslateService);
  selectedLanguage: string; 

  constructor(private login:LoginService ) { 
    const savedLang = localStorage.getItem('language');

    const langToUse = savedLang || this.translate.defaultLang || 'en';
    
    this.selectedLanguage = langToUse;

    this.translate.use(langToUse);
  }

  timerAuth(): boolean {
    const token = this.login.getToken();
    if (!token) return false;
  
    if (this.timerSesion) return true;
  
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    const msLeft = exp - now;
  
    if (msLeft <= 0) {
      
      return false;
    }
  
    this.tiempoRestanteMs.set(msLeft);
  
    const interval = setInterval(() => {
      const newMsLeft = exp - Date.now();
      if (newMsLeft <= 0) {
       
        this.tiempoRestanteMs.set(0);
        clearInterval(interval);
        this.translate.get([
        'Swal.TitleLogout']).subscribe((t:any) =>{
        Swal.fire({
          title:t['Swal.TitleLogout'],
          icon:'error',
          backdrop: `rgba(155,155,155,0.9)`,
          allowOutsideClick: false, 
          allowEscapeKey: false,    
          allowEnterKey: false, 
          confirmButtonColor:`green`
        }).then(rs=>{
          if(rs.isConfirmed){
            window.location.reload()

          }
        })
      })
        
        
       
      } else {
        this.tiempoRestanteMs.set(newMsLeft);
       
      }
    }, 1000);
  
    this.timerSesion = true;
    return true;
  }
 
  


}
