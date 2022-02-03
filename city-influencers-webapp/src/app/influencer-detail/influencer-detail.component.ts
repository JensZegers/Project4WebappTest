import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { InfluencersService } from '../influencers.service';
import { PlatformAccountService } from '../platform-account.service';
import { PlatformAccount } from '../platformAccount';
import { Role } from '../Role';
import { User } from '../user';

@Component({
  selector: 'app-influencer-detail',
  templateUrl: './influencer-detail.component.html',
  styleUrls: ['./influencer-detail.component.scss']
})
export class InfluencerDetailComponent implements OnInit, OnDestroy {
  role: Role = {
    roleId: 0,
    roleName: ''
  }

  user: User = {
    userId: 0, firstName: "voornaam", surname: "achternaam", dateOfBirth: "", profilePicture: "", phoneNumber: "", gender: "", email: "email@test.com", password: "",
    isActive: false,
    aboutMe: '',
    token: '',
    roleId: 0,
    role: this.role
  }

  platformAccounts: PlatformAccount[] = [];
  platformAccounts$: Subscription = new Subscription;
  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  constructor(private platformAccountService: PlatformAccountService,private influencersService: InfluencersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId != null) {
      this.user$ = this.influencersService.getInfluencerById(+userId).subscribe((result) => {
        var splicedDate = result.dateOfBirth.substring(0,10);
        this.user = result;
        this.user.dateOfBirth = splicedDate;
        this.getPlatformAccounts(this.user.userId);
      });
    }
  }

  ngOnDestroy(): void {
      this.user$.unsubscribe();
      this.putUser$.unsubscribe();
  }

  back(){
    this.router.navigateByUrl('/influencers');
  }

  getUser(user: User){
    this.user$ = this.influencersService.getInfluencerById(user.userId).subscribe((result) => {
      var splicedDate = result.dateOfBirth.substring(0,10);
      this.user = result;
      this.user.dateOfBirth = splicedDate;
    });
  }

  getPlatformAccounts(id: number){
    this.platformAccounts$ = this.platformAccountService.getAccountsByUserId(id).subscribe((result) => {
      this.platformAccounts = result;
    })
  }

  accept(user: User){
    user.isActive = !user.isActive;
    this.putUser$ = this.influencersService.putInfluencer(user.userId, user).subscribe(result => {
      this.getUser(user);
    })
  }

  trust(user: User){
    user.roleId = 4
    this.putUser$ = this.influencersService.putInfluencer(user.userId, user).subscribe(result => {
      this.putUser$ = this.influencersService.putInfluencer(user.userId, user).subscribe(result => {
        this.getUser(user);
      })
    })
  }

  disActivate(user: User){
    user.roleId = 3;
    user.isActive = false;
    this.putUser$ = this.influencersService.putInfluencer(user.userId, user).subscribe((result) => {
      this.putUser$ = this.influencersService.putInfluencer(user.userId, user).subscribe(result => {
        this.getUser(user);
      })
    })
  }

  disTrust(user: User){
    user.roleId = 3;
    user.isActive = true;
    this.putUser$ = this.influencersService.putInfluencer(user.userId, user).subscribe((result) => {
      this.putUser$ = this.influencersService.putInfluencer(user.userId, user).subscribe(result => {
        this.getUser(user);
      })
    })
  }

}
