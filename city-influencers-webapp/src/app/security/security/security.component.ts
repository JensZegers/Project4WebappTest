import {Component, OnInit} from '@angular/core';
import {AuthUser} from '../user';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  user: AuthUser = {
    email: '',
    password: '',
    firstName: 'user'
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  isLogin: boolean = false;
  isRegister: boolean = false;
  isLogout: boolean = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/login': {
        this.isLogin = true;
        break;
      }
      case '/logout': {
        this.isLogout = true;
        this.authService.deleteToken();
        this.router.navigate(['']);
        localStorage.clear();
        break;
      }

      default: {
        this.isLogin = true;
        break;
      }
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.isLogin) {
      this.authService.authenticate(this.user).subscribe(result => {
        this.errorMessage = '';
        console.log(result);
        // save access token localstorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.userId.toString());
        localStorage.setItem('email', this.user.email);
        console.log(result);
        this.router.navigate(['']);
      }, error => {
        this.errorMessage = 'Email/password not correct!';
        this.isSubmitted = false;
      });
    } else {
      alert('work in progress');
    }
  }

}
