import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/auth-service.service';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SignupComponent } from "./components/auth/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule, LoginComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager';
  isLoggedIn$: any;

  constructor(private authService: AuthenticationService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}