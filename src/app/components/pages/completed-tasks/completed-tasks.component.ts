import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css'
})
export class CompletedTasksComponent {

  tasks: any[] = [];
  completedTasks: any[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getAllTasks().subscribe((response: any) => {
      if (response) {
        this.tasks = response;
        this.completedTasks = this.tasks.filter((task) => {
          return parseInt(localStorage.getItem(`task-${task._id}-progress`) || '0') === 100;
        });
      }
    });
  }
}
// completed-tasks.component.ts

