import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {InfluencersService} from '../influencers.service';
import { Role } from '../Role';

@Component({
  selector: 'app-influencers-form',
  templateUrl: './influencers-form.component.html',
  styleUrls: ['./influencers-form.component.scss']
})
export class InfluencersFormComponent implements OnInit,OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  influencerId: number = 0;

  role: Role = {
    roleId: 0,
    roleName: ''
  }

  user: User = {
    userId: 0, firstName: "", surname: "", isActive: false, dateOfBirth: "", aboutMe: "", profilePicture: "", phoneNumber: "", gender: "", email: '', password: '', token: '',
    roleId: 0,
    role: this.role
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  influencer$: Subscription = new Subscription();
  putInfluencer$: Subscription = new Subscription();

  constructor(private router: Router, private influencerService: InfluencersService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.influencerId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.influencerId != null && this.influencerId > 0) {
      this.influencer$ = this.influencerService.getInfluencerById(this.influencerId).subscribe(result => {this.user = result});
    }
   }
   ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.influencer$.unsubscribe();
    this.putInfluencer$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isEdit) {
      this.putInfluencer$ = this.influencerService.putInfluencer(this.influencerId, this.user).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/influencers");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

}
