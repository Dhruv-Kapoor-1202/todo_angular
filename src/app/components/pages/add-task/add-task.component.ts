import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  title='';
  description="";
  priority="";
  dueDate=new Date();
  error='';
  httpService=inject(HttpService);
  authService=inject(AuthenticationService);
  result=undefined

  constructor(){}
  addTask() {
    this.authService.verifyToken().subscribe((userId: string) => {
      this.httpService.addTask(this.title, this.description, this.priority, this.dueDate, userId).subscribe((response: any) => {
        this.title = '';
        this.description = '';
        this.dueDate = new Date;
        this.priority = '';
      });
    });
  }
}