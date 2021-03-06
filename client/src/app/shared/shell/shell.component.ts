import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  user: boolean = false;
  token = null;
  isDarkMode: boolean = false;
  showFiller = false;
  themeState: string = 'dark_mode';
  admin: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.authService.myData$.subscribe((data) => (this.user = data));
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeState = localStorage.getItem('user-theme');
    this.isDarkMode
      ? this.themeService.update('light_mode')
      : this.themeService.update('dark_mode');
  }

  logout() {
    this.authService.doLogout();
  }

  ngOnInit() {
    this.token = this.authService.getToken();
    if (this.token) {
      if (this.authService.getRole() === 'admin') {
        console.log(this.authService.getRole());
        this.admin = true;
        this.user = false;
      } else {
        this.user = true;
      }
    }
  }
}
