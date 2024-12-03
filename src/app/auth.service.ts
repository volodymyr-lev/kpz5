import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7274/api/auth'; 
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response) => {
        if (response.token) {
          const tokenPayload = JSON.parse(atob(response.token.split('.')[1])); // Декодування JWT
          const roles = tokenPayload.role ? (Array.isArray(tokenPayload.role) ? tokenPayload.role : [tokenPayload.role]) : [];
  
          const currentUser = { token: response.token, email, roles };
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
        }
        return response;
      })
    );
  }

  register(email: string, password: string, confirmPassword: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password, confirmPassword });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    const currentUser = this.currentUserValue;
    return currentUser?.roles?.includes(role) || false;
  }
}
