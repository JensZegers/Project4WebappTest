import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfluencersService } from '../influencers.service';
import { PlatformAccountService } from '../platform-account.service';
import { PlatformAccount } from '../platformAccount';
import { User } from '../user';

@Component({
  selector: 'app-influencers-list',
  templateUrl: './influencers-list.component.html',
  styleUrls: ['./influencers-list.component.scss']
})
export class InfluencersListComponent implements OnInit {
  influencers: User[] = [];

  influencers$: Subscription = new Subscription();

  platformAccounts: PlatformAccount[] = [];
  platformAccounts$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private influencersService: InfluencersService, private platformAccountService: PlatformAccountService ,private router: Router) { }

  ngOnInit(): void {
    this.getInfluencers();
  }

  ngOnDestroy(): void{
    this.influencers$.unsubscribe();
  }

  getInfluencers(){
    this.influencers$ = this.influencersService.getNonActiveInfluencers().subscribe(result => {
      this.influencers = result;
      this.influencers.forEach(influencer => {
        this.getPlatformAccounts(influencer.userId);
      });
    })
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

}
