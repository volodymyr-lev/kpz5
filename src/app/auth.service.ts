import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'; // Додаємо Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7274/api/Auth'; 
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    const storedUser = isPlatformBrowser(this.platformId) 
      ? localStorage.getItem('currentUser') 
      : null;
    
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
          try {
            const tokenPayload = JSON.parse(atob(response.token.split('.')[1])); 
            console.log('Full Token Payload:', tokenPayload);
    
            const roles = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] 
                          ? (Array.isArray(tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) 
                              ? tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] 
                              : [tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']]) 
                          : [];
            
            console.log('Parsed Roles:', roles);
            
            // Додаткова перевірка валідності токену
            const expirationTime = tokenPayload.exp * 1000;
            const currentTime = Date.now();
            
            if (expirationTime < currentTime) {
              throw new Error('Token already expired');
            }
    
            const currentUser = { 
              token: response.token, 
              email, 
              roles,
              expiresAt: expirationTime 
            };
            
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            
            this.currentUserSubject.next(currentUser);
          } catch (error) {
            console.error('Token processing error:', error);
            this.logout();
            throw error;
          }
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }
  
  register(email: string, password: string, confirmPassword: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password, confirmPassword });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
    
    this.router.navigate(['/unauthorized']);
  }

  getUserRoles(): string[] {
    const currentUser = this.currentUserValue;
    console.log(currentUser);
    return currentUser?.roles || [];
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    const currentUser = this.currentUserValue;
    return currentUser?.roles?.includes(role) || false;
  }

  getToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser?.token || null;
  }
}
