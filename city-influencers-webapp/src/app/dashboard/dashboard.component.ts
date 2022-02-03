import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assignment } from '../assignment';
import { AssignmentsService } from '../assignments.service';
import { InfluencersService } from '../influencers.service';
import { User } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  influencers: User[] = [];
  influencers$: Subscription = new Subscription();
  assignments: Assignment[] = [];
  assignments$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private influencersService: InfluencersService, private router: Router, private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
    this.getInfluencers();
    this.getAssignments();
  }

  ngOnDestroy(): void{
    this.influencers$.unsubscribe();
  }

  getInfluencers(){
    this.influencers$ = this.influencersService.getInfluencers().subscribe(result => {
      this.influencers = result;
    })
  }

  getAssignments(){
    this.assignments$ = this.assignmentService.getAssignments().subscribe(result => this.assignments = result);
  }


}
