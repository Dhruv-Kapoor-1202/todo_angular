import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/auth-service.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SidebarComponent,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {


  title = 'task-manager';
  isLoggedIn: boolean = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn); 
  }
}