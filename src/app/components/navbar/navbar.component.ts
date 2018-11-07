import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedIn } from 'src/app/models/LoggedIn';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: LoggedIn = new LoggedIn();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn().subscribe(x => this.loggedIn = x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
