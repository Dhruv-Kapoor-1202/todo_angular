
import { Component, inject} from '@angular/core';
import { Router,RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true, // Retain standalone for independent functionality
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,RouterLink,CommonModule] // Include FormsModule and provideHttpClient directly
})
export class LoginComponent{
  email= '';
  password= '';
  error='';
  httpService=inject(HttpService);
  result=undefined;
  isLoggedIn = false;
  loading=false;

  constructor(private router:Router,private authService: AuthenticationService){}
  login(){
    this.loading=true;
    this.httpService.login(this.email,this.password).subscribe((response:any)=>{
      if (response.success) {
        const token = response.accessToken;
        localStorage.setItem('token', token);
        this.authService.login();
        this.authService.isLoggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn);
        
        
        this.router.navigate(['/addTask'])
      }
      this.loading=false;
        
    
    },
    (error:any)=>{
      console.log(error);
      this.error=error.error;
      
      this.email='';
      this.password=''
      this.loading=false;
      
    }
  )
    
    
  }
}
