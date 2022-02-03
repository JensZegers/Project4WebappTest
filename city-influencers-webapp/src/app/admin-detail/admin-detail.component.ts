import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminsService } from '../admin.service';
import { City } from '../city';
import { CityUserService } from '../city-user.service';
import { CityService } from '../city.service';
import { CityUser } from '../cityUser';
import { Role } from '../Role';
import { User } from '../user';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

  role: Role = {
    roleId: 2,
    roleName: 'admin'
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
    roleId: 2,
    role: this.role
  }

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

  admin$: Subscription = new Subscription();
  city$: Subscription = new Subscription();
  cityUser$: Subscription = new Subscription();

  constructor(private cityService: CityService,private cityUserService: CityUserService, private adminsService: AdminsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    var adminId = this.route.snapshot.paramMap.get('id');
    if (adminId != null){
      this.cityUser$ = this.cityUserService.getCityUserByAdminId(+adminId).subscribe((result => {
        this.cityUser = result;
        this.city$ = this.cityService.getCityById(this.cityUser.cityId).subscribe(result => {
          this.city = result;
          this.cityUser.city = this.city;
          this.admin$ = this.adminsService.getAdminById(this.cityUser.userId).subscribe(result => {
            this.admin = result;
            this.cityUser.user = this.admin;
            console.log("cityUser",this.cityUser);
          })
        })
      }))
    }
  }

  back(){
    this.router.navigateByUrl('/admins');
  }

}
