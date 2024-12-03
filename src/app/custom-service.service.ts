import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomServiceService {
  getMessage(): string {
    return 'Це повідомлення з сервісу!';
  }
}
