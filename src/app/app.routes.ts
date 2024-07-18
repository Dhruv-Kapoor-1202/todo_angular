import { Routes } from '@angular/router';
import { AllTaskComponent } from './components/pages/all-task/all-task.component';
import { ImportantTasksComponent } from './components/pages/important-tasks/important-tasks.component';
import { CompletedTasksComponent } from './components/pages/completed-tasks/completed-tasks.component';
import { AddTaskComponent } from './components/pages/add-task/add-task.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      
      {
        path: 'addTask',
        component: AddTaskComponent
      },
      {
        path: 'allTask',
        component: AllTaskComponent
      },
      {
        path: 'important',
        component: ImportantTasksComponent
      },
      {
        path: 'completed',
        component: CompletedTasksComponent
      }
    ]
  }
];