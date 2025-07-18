import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TimerService } from '../../services/timer/timer.service';
import { ThemeService } from '../../services/theme/theme.service';
import { Subscription } from 'rxjs';


import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly Number = Number;
  selectedLanguage: string;
  isDarkMode: boolean = false;
  isModalOpen = false;

  private themeSubscription: Subscription | undefined;
  public loginService = inject(LoginService);

  constructor(
    public timer : TimerService,
    private translate: TranslateService,
    public themeService:ThemeService,
    private router: Router
  ) {
    const savedLang = localStorage.getItem('language');
    const langToUse = savedLang || this.translate.defaultLang || 'en';
    this.selectedLanguage = langToUse;
    this.translate.use(langToUse);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.closeModal();
    }
  }
  
  openModal(): void {
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this.timer.timerAuth();
    this.themeSubscription = this.themeService.darkMode$.subscribe(mode => {
      this.isDarkMode = mode;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
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

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeModal(); 
  }

  // --- FUNCIONES AÑADIDAS DEL SIDEBAR ---

  getUserName(): string {
    return this.loginService.getInfo('user').toUpperCase();
  }

  getCompanyName(): string {
    return this.loginService.getInfo('company');
  }

  logOut() {
    console.log('auth logout');
    return this.loginService.logout().subscribe({
      next: (data) => {
        console.log(data);
        // Opcional: Redirigir al login después de cerrar sesión
        // this.router.navigate(['/login']);
      }
    });
  }
}