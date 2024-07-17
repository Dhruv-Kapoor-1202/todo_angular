// app-routing.module.ts
import { Routes } from '@angular/router';
import { AllTaskComponent } from './components/pages/all-task/all-task.component';
import { ImportantTasksComponent } from './components/pages/important-tasks/important-tasks.component';
import { CompletedTasksComponent } from './components/pages/completed-tasks/completed-tasks.component';
import { AddTaskComponent } from './components/pages/add-task/add-task.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import {  AuthGuardService } from './services/auth-guard.service';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: AllTaskComponent 
  },
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
    children: [
      {
        path: 'addTask',
        component: AddTaskComponent,
        pathMatch: 'full'
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