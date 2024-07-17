import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/auth-service.service';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,LayoutComponent, SidebarComponent, CommonModule, LoginComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn); 
  }
}