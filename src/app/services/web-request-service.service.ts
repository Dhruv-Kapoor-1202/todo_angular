
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestServiceService {

  readonly ROOT_URL = 'http://localhost:8800';
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'application/json');
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload, { headers: this.getHeaders() });
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`, { headers: this.getHeaders() });
  }

  delete(uri: string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`,{ headers: this.getHeaders() });
  }
}
