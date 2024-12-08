import { Component, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent {
  constructor(private router: Router, public authService: AuthService) {}

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  logout() {
    this.authService.logout();
  }
}
