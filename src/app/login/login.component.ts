import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone:true,
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {
  email = '';
  password = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => (this.errorMessage = err.error || 'Login failed')
    });
  }
}