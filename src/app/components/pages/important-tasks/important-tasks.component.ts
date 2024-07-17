import { Component,inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.css'
})
export class ImportantTasksComponent {
 
  highPriorityTasks: any[] = [];
  httpService = inject(HttpService);
  constructor() { }

  ngOnInit(): void {
    this.httpService.getAllTasks().subscribe((tasks: any) => {
      console.log(tasks)
      this.highPriorityTasks = tasks.filter((task: { priority: string; }) => task.priority === 'high');
    });
  }
}