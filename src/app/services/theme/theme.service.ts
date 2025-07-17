import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
private _darkMode = new BehaviorSubject<boolean>(false);
readonly darkMode$ = this._darkMode.asObservable();

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initTheme();
  }

  private initTheme(): void {
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      this.setDarkMode(true);
    } else if (storedTheme === 'light') {
      this.setDarkMode(false);
    } else {
      
      this.setDarkMode(prefersDark);
    }
  }

  toggleDarkMode(): void {
    const newMode = !this._darkMode.value;
    this.setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  }

  private setDarkMode(isDark: boolean): void {
    this._darkMode.next(isDark);
    if (isDark) {
      this.renderer.addClass(document.documentElement, 'dark'); 
    } else {
      this.renderer.removeClass(document.documentElement, 'dark'); 
    }
  }
}