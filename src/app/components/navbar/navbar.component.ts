import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/models/AuthState';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authState: AuthState = new AuthState();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState().subscribe(x => this.authState = x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
