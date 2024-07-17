import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WebRequestServiceService } from './web-request-service.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpClient=inject(HttpClient);

  constructor(private webReqService: WebRequestServiceService) { }
 
  login(email:string,password:string){

    return this.webReqService.post('api/auth/login',{email,password})
  }

  signup(username: string, email: string, password: string){
    return this.webReqService.post('api/auth/register',{username,email,password})
  }

  addTask(title:string,description:string,priority:string,dueDate:Date,userId:String){
    return this.webReqService.post('api/task/addTask',{title,description,dueDate,priority,userId})
  }

  verifyToken(token:string){
    return this.webReqService.post('api/verify-token',{token});
  }

  getAllTasks(){
    return this.webReqService.get('api/task/getAll');
  }

  updateTask(taskId:string,payload:any){
    return this.webReqService.post(`api/task/${taskId}`,payload);
  }

  getHistory(taskId:string){
    return this.webReqService.get(`api/task/history/${taskId}`);
  }

  deleteTask(taskId:string){
    return this.webReqService.delete(`api/task/find/${taskId}`);
  }
   
}
