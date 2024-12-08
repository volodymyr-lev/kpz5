import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  const currentUser = authService.currentUserValue;
  console.log('Current User in Interceptor:', currentUser);

  if (currentUser && currentUser.token) {
    
    try {
      const tokenPayload = JSON.parse(atob(currentUser.token.split('.')[1]));
      const expirationTime = tokenPayload.exp * 1000; 
      const currentTime = Date.now();

      console.log('Token Expiration:', new Date(expirationTime));
      console.log('Current Time:', new Date(currentTime));

      if (expirationTime < currentTime) {
        console.error('Token expired, logging out');
        authService.logout();
        return throwError(() => new Error('Token expired'));
      }

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });

      console.log('Request Headers:', req.headers);

    } catch (error) {
      console.error('Token validation error:', error);
      authService.logout();
      return throwError(() => error);
    }
  }
  
  return next(req);
};