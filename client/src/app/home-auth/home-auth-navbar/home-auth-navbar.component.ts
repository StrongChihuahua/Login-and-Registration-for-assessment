import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-auth-navbar',
  templateUrl: './home-auth-navbar.component.html',
  styleUrls: ['./home-auth-navbar.component.css']
})
export class HomeAuthNavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.deleteToken();
    this.router.navigateByUrl('/login');
  }

}
