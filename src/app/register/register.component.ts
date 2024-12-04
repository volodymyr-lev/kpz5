import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone:true,
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onRegister(): void {
    this.authService.register(this.email, this.password, this.confirmPassword).subscribe(
      (response) => {
        alert('Реєстрація успішна!');
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
      (error) => {
        this.errorMessage = error.error.message || 'Помилка реєстрації'; //
      }
    );
  }
} 