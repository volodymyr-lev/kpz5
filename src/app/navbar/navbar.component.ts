import { Component, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
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
