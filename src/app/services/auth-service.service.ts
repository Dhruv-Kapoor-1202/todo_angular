import { Injectable ,inject} from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root' // Provide service globally for accessibility
})
export class AuthenticationService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLocalStorage());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() { }
  httpService=inject(HttpService);

  private checkLocalStorage(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined; // Check for both null and undefined
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  getToken():string|null{
    const token=localStorage.getItem('token');
    return token;
  }
  verifyToken(): Observable<string> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.httpService.verifyToken(token).pipe(
        map((response: any) => response.id)
      );
    } else {
      return of(''); // or throw an error, depending on your use case
    }
  }

  
}