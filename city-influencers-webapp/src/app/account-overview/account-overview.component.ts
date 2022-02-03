import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminsService } from '../admin.service';
import { AuthService } from '../security/auth.service';
import { User } from '../user';
import { AuthUser } from '../security/user';
import { Router } from '@angular/router';
import { Role } from '../Role';
import { CityUser } from '../cityUser';
import { City } from '../city';
import { CityUserService } from '../city-user.service';
import { CityService } from '../city.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {
  isEdit = false;

  adminId = Number(localStorage.getItem('userId'));

  cities: City[] = [];

  role: Role = {
    roleId: 0,
    roleName: ''
  }

   admin: User = {
     userId: 0,
     firstName: 'voornaam',
     surname: 'achternaam',
     isActive: false,
     dateOfBirth: '',
     aboutMe: '',
     profilePicture: '',
     phoneNumber: '',
     gender: '',
     email: 'email@test.com',
     password: '',
     token: '',
     roleId: 0,
     role: this.role
   };

   city: City = {
     cityId: 0,
     zipcode: '',
     name: '',
     isActive: false
   }

   cityUser: CityUser = {
     cuId: 0,
     cityId: 0,
     userId: 0,
     isPrimary: false,
     description: '',
     city: this.city,
     user: this.admin
   }

  authUser: AuthUser = {
    email: '',
    password: '',
    firstName: ''
  }

  admin$: Subscription = new Subscription();
  putAdmin$ : Subscription = new Subscription();
  city$: Subscription = new Subscription();
  cityUser$: Subscription = new Subscription();


  constructor(private cityService: CityService,private cityUserService: CityUserService, private adminService: AdminsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.adminId
      );
    if(this.adminId != null && this.adminId !== 0){
      this.cityUser$ = this.cityUserService.getCityUserByAdminId(this.adminId).subscribe((result => {
        this.cityUser = result;
        this.city$ = this.cityService.getCityById(this.cityUser.cityId).subscribe(result => {
          this.city = result;
          this.cityUser.city = this.city;
          this.admin$ = this.adminService.getAdminById(this.cityUser.userId).subscribe(result => {
            this.admin = result;
            this.cityUser.user = this.admin;
            console.log(this.cityUser)
          })
        })
      }))
    }
  }
  back(){
    this.router.navigateByUrl('/admins');
  }

  edit(id: number){
    this.router.navigate(['edit-admin-form'], {state: {id: id, mode: 'edit'}});
  }

}
