import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminsService } from '../admin.service';
import { City } from '../city';
import { CityUserService } from '../city-user.service';
import { CityService } from '../city.service';
import { CityUser } from '../cityUser';
import { Role } from '../Role';
import {AddAdmin} from './add-admin'
import { AddCityUser } from './addCityUser';

@Component({
  selector: 'app-add-admin-form',
  templateUrl: './add-admin-form.component.html',
  styleUrls: ['./add-admin-form.component.scss']
})
export class AddAdminFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  adminId: number = 0;

  admin: AddAdmin = {
    userId: 0,
    firstName: '',
    surname: '',
    isActive: false,
    dateOfBirth: '',
    aboutMe: '',
    profilePicture: '',
    phoneNumber: '',
    gender: '',
    email: '',
    password: 'admin123',
    token: '',
    roleId: 2,
  }

  city: City = {
    cityId: 0,
    zipcode: '',
    name: '',
    isActive: false
  }


  cityUser: AddCityUser = {
    cuId: 0,
    cityId: this.router.getCurrentNavigation()?.extras.state?.cityId,
    userId: this.router.getCurrentNavigation()?.extras.state?.userId,
    isPrimary: false,
    description: ''
  }

  cities: City[] = [];
  cities$: Subscription = new Subscription();

  admin$: Subscription = new Subscription();
  postAdmin$: Subscription = new Subscription();
  putAdmin$: Subscription = new Subscription();
  postCityUser$: Subscription = new Subscription();


  constructor(private router: Router, private cityService: CityService, private adminsService: AdminsService, private cityUserService: CityUserService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.adminId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if(this.adminId != null && this.adminId >0 ){
      this.admin$ = this.adminsService.getAdminById(this.adminId).subscribe(result => {this.admin = result});
    }
   }

  ngOnInit(): void {
    this.getCities();
  }

  ngOnDestroy(): void {
      this.admin$.unsubscribe();
      this.postAdmin$.unsubscribe();
      this.putAdmin$.unsubscribe();
      this.postCityUser$.unsubscribe();
      this.cities$.unsubscribe();
  }
  getCities(){
    this.cities$ = this.cityService.getCities().subscribe((result) => {
      result.forEach((city) => {
        if (city.isActive){
          this.cities.push(city);
        }
      })
    })
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if (this.isAdd){
      this.postAdmin$ = this.adminsService.postAdmin(this.admin).subscribe(result => {
        this.cityUser.userId = result.userId;
        console.log(this.cityUser);
        this.postCityUser$ = this.cityUserService.postCityUser(this.cityUser).subscribe(result => {
          this.router.navigateByUrl("/admins");
        },
        error => {
          this.errorMessage = error.message;
        });
      });
    }
    if (this.isEdit){
      this.putAdmin$ = this.adminsService.putAdmin(this.adminId, this.admin).subscribe(result => {
        this.router.navigateByUrl("/admins");
      },
      error => {
        this.errorMessage = error.message;
      })
    }
  }

}
