import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminsService } from '../admin.service';
import { City } from '../city';
import { CityUser } from '../cityUser';
import { Role } from '../Role';
import { User } from '../user';

@Component({
  selector: 'app-edit-admin-form',
  templateUrl: './edit-admin-form.component.html',
  styleUrls: ['./edit-admin-form.component.scss']
})
export class EditAdminFormComponent implements OnInit, OnDestroy {

  isAdd: boolean = false;
  isEdit: boolean = false;
  adminId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  role: Role = {
    roleId: 0,
    roleName: ''
  }

  admin: User = {
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

  user: User = {
    userId: 0,
    roleId: 0,
    firstName: '',
    surname: '',
    isActive: false,
    dateOfBirth: '',
    aboutMe: '',
    profilePicture: '',
    phoneNumber: '',
    gender: '',
    email: '',
    password: '',
    token: '',
    role: this.role
  }

  cityUser: CityUser = {
    cuId: 0,
    cityId: this.router.getCurrentNavigation()?.extras.state?.cityId,
    userId: this.router.getCurrentNavigation()?.extras.state?.userId,
    isPrimary: false,
    description: '',
    city: this.city,
    user: this.user
  }

  admin$: Subscription = new Subscription();
  putAdmin$: Subscription = new Subscription();

  constructor(private router: Router, private adminsService: AdminsService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.adminId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.adminId != null && this.adminId > 0) {
      this.admin$ = this.adminsService.getAdminById(this.adminId).subscribe(result => {this.admin = result});
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.admin$.unsubscribe();
    this.putAdmin$.unsubscribe();
  }

  onSubmit(): void{
    this.isSubmitted = true;
    if(this.isEdit){
      this.putAdmin$ = this.adminsService.putAdmin(this.adminId, this.admin).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/account");
      },
      error => {
        this.errorMessage = error.message;
      });
    }

  }

  handleUploadSuccess(event: any){
    this.admin.profilePicture = event.url;
    console.log('File upload success with a response: ',event);
  }

  handleUploadError(event: any) {
    console.log('There was an error in upload: ', event);
  }

  handleFileInput(event: any) {
    console.log('This is the event on file change: ', event);
  }
}
