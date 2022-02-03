import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from '../admin.service';
import { AuthService } from '../security/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user?: User

  constructor(public authService: AuthService, public adminService: AdminsService, private router: Router) { }

  ngOnInit(): void {
    var userId = localStorage.getItem('userId');

    if (userId != null && userId != ''){
      this.adminService.getAdminById(+userId).subscribe(userFromDB => {
        this.user = userFromDB;
      })
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

  }

  ngOnDestroy(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    this.router.onSameUrlNavigation = 'ignore';
  }

}
