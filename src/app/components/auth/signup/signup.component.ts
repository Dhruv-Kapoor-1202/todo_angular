
import { Component, inject} from '@angular/core';
import { Router,RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

@Component({
  standalone: true, // Retain standalone for independent functionality
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule,RouterLink] // Include FormsModule and provideHttpClient directly
})
export class SignupComponent{
  username='';
  email="";
  password= '';
  error='';
  httpService=inject(HttpService);
  result=undefined

  constructor(private router:Router){}
  onSignup(){
    this.httpService.signup(this.username,this.email,this.password).subscribe((response:any)=>{
      if (response) {
                const token = response.token;
                localStorage.setItem('token', token);
                this.router.navigate(['/login'])
              } 
    console.log(response);
    })
  }
}
