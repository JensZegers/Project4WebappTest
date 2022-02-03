import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '../platform';
import { PlatformAccountService } from '../platform-account.service';
import { PlatformAccount } from '../platformAccount';
import { Role } from '../Role';
import { User } from '../user';

@Component({
  selector: 'app-influencer-card',
  templateUrl: './influencer-card.component.html',
  styleUrls: ['./influencer-card.component.scss']
})
export class InfluencerCardComponent implements OnInit {

  role: Role = {
    roleId: 0,
    roleName: ''
  }

  @Input() influencer: User = {
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
    roleId: 0,
    role: this.role
  }

  platformAccounts: PlatformAccount[] = []
  platformAccounts$: Subscription = new Subscription();

  constructor(public router: Router, private platformAccountService: PlatformAccountService) { }

  ngOnInit(): void {
    this.getAccountsFromUser();
  }

  toDetail(id: number){
    this.router.navigateByUrl('/influencer/'+id);
  }

  getPlatformAccounts(id: number){
    this.platformAccounts$ = this.platformAccountService.getAccountsByUserId(id).subscribe((result) => {
      this.platformAccounts = result;
      console.log(this.platformAccounts)

    })
  }

  getAccountsFromUser(){
    console.log(this.influencer)
    this.getPlatformAccounts(this.influencer.userId);
  }

}
