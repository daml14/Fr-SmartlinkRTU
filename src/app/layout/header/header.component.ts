import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TimerService } from '../../services/timer/timer.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule,
    TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly Number = Number;
  selectedLanguage: string; 
  isDarkMode: boolean = false;

  constructor(public timer : TimerService, private translate: TranslateService,public themeService:ThemeService){
    const savedLang = localStorage.getItem('language');

    const langToUse = savedLang || this.translate.defaultLang || 'en';
    
    this.selectedLanguage = langToUse;

    this.translate.use(langToUse);
  }


  dropProfile = false;
  isModalOpen = false;

  
  openModal(){
    this.isModalOpen = true;
  }
  closeModal(){
    this.isModalOpen = false;
  }
  ngOnInit(): void {
    this.timer.timerAuth();
    this.themeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
    
  }
  ngOnDestroy(): void {
    
  }

  cambiarIdiomaDesdeSelector(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;

    
    this.selectedLanguage = lang;

    this.translate.use(lang);
    localStorage.setItem('language', lang);

  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

}