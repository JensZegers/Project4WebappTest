import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminsService } from '../admin.service';
import { CityUserService } from '../city-user.service';
import { CityUser } from '../cityUser';
import { User } from '../user';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AddAdminComponent implements OnInit {

  admins: User[] = [];
  admins$: Subscription = new Subscription();
  cityUsers: CityUser[] = [];
  cityUsers$: Subscription = new Subscription();
  deleteAdmin$: Subscription = new Subscription();
  putAdmin$: Subscription = new Subscription();

  errorMessage: string = '';
  isLoading: Boolean = true;
  constructor(private adminsService: AdminsService,private cityUserService: CityUserService, private router: Router) { }

  ngOnInit(): void {
    this.getAdmins();
    this.isLoading = false;
    this.getAdminsCity();
  }

  ngOnDestroy(): void {
    this.admins$.unsubscribe();
    this.deleteAdmin$.unsubscribe();
    this.putAdmin$.unsubscribe();
    this.cityUsers$.unsubscribe();
  }

  add(){
    this.router.navigate(['add-admin-form'], {state: {mode: 'add'}});
  }

  delete(id: number){
    this.deleteAdmin$ = this.adminsService.deleteAdmin(id).subscribe(result => {
      this.getAdmins();
    }, error => {
      this.errorMessage = error.message;
    })
  }

  getAdminsCity(){
    this.cityUsers$ = this.cityUserService.getCityUsers().subscribe((result => {
      (result.forEach(admin => {
        if(admin.user.roleId == 2 ){
          this.cityUsers.push(admin)
        }
      }));
    }));
  }

  getAdmins(){
    this.admins$ = this.adminsService.getAdmins().subscribe((result) => {
      this.admins = result;
      this.isLoading = false;
    });
  }

  toDetail(id: number){
    this.router.navigateByUrl('/admin/'+id);
  }

}
