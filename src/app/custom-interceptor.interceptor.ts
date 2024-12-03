import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
