import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent {
  tasks: any[] = [];
  editedTask: any = {};
  showEditModal: boolean = false;
  showHistoryModal: boolean = false;
  taskHistory: any[] = [];
  httpService = inject(HttpService);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.httpService.getAllTasks().subscribe((response: any) => {
      if (response) {
        this.tasks = response;
        this.tasks.forEach((task) => {
          task.progress = parseInt(localStorage.getItem(`task-${task._id}-progress`) || '0');
        });
      }
    });
  }

  updateProgress(task: any, event: Event) {
    const target = event.target as HTMLSelectElement;
    task.progress = parseInt(target.value);
    localStorage.setItem(`task-${task._id}-progress`, target.value);
    
    
  }
  

  editTask(task: any): void {
    this.editedTask = task;
    this.showEditModal = true;
  }

  saveTask(): void {
    this.httpService.updateTask(this.editedTask._id, this.editedTask).subscribe((response: any) => {
      if (response) {
        this.cancelEdit();
      }
    })
  }

  deleteTask(task: any): void {
    this.editedTask = task;
    this.httpService.deleteTask(this.editedTask._id).subscribe((response: any) => {
      if (response) {
        const index = this.tasks.indexOf(task);
        if (index!== -1) {
          this.tasks.splice(index, 1);
        }
        window.location.reload();
      }
    })
  }

  cancelEdit(): void {
    this.editedTask = {};
    this.showEditModal = false;
  }

  viewTaskHistory(task: any): void {
    this.editedTask = task;
    this.httpService.getHistory(this.editedTask._id).subscribe((response: any) => {
      if (response) {
        this.taskHistory = response;
        this.showHistoryModal = true;
      }
    });
  }

  closeHistoryModal(): void {
    this.taskHistory = [];
    this.showHistoryModal = false;
  }

  exportToCSV(): void {
    const csvData = this.tasks.map((task) => {
      return {
        Title: task.title,
        Description: task.description,
        Priority: task.priority,
        Progress: task.progress
      };
    });
  
    const csvRows = [];
    csvRows.push(Object.keys(csvData[0]).join(','));
  
    csvData.forEach((row) => {
      csvRows.push(Object.values(row).join(','));
    });
  
    const csvString = csvRows.join('\n');
  
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
  
    window.URL.revokeObjectURL(url);
  }
}