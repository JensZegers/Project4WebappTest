import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfluencersService } from '../influencers.service';
import { PlatformAccountService } from '../platform-account.service';
import { PlatformAccount } from '../platformAccount';
import { User } from '../user';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.component.html',
  styleUrls: ['./influencers.component.scss']
})
export class InfluencersComponent implements OnInit {
  influencers: User[] = [];

  influencers$: Subscription = new Subscription();
  deleteInfluencer$: Subscription = new Subscription();

  platformAccounts: PlatformAccount[] = [];
  platformAccounts$: Subscription = new Subscription();


  errorMessage: string = '';
  isLoading: Boolean = true;
  constructor(private platformAccountService: PlatformAccountService,private influencersService: InfluencersService, private router: Router) { }

  ngOnInit(): void {
    this.getInfluencers();
  }
  ngOnDestroy(): void{
    this.influencers$.unsubscribe();
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['influencers-form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteInfluencer$ = this.influencersService.deleteInfluencer(id).subscribe(result => {
      //all went well
      this.getInfluencers();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getInfluencers(){
    this.influencers$ = this.influencersService.getInfluencers().subscribe((result) => {
      this.influencers = result;
      this.getAccountsFromUser();
      this.isLoading = false;
    });
  }

  getPlatformAccounts(id: number){
    this.platformAccounts$ = this.platformAccountService.getAccountsByUserId(id).subscribe((result) => {
      this.platformAccounts = result;
    });
  }

  getAccountsFromUser(){
    this.influencers.forEach(influencer => {
      this.getPlatformAccounts(influencer.userId);
    });
  }

}
