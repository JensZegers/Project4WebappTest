import { Component, OnInit } from '@angular/core';
import { Assignment} from '../assignment';
import { AssignmentsService } from '../assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Voucher } from '../voucher';
import { City } from '../city';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {
  voucher: Voucher= {
    voucherId: 0,
    url: '',
    organisation: '',
    value: '',
    description: ''
  };

  city: City={
    cityId: 0,
    zipcode: '',
    name: '',
    isActive: false
  }

  assignment: Assignment = {
    assignmentId: 0, image: "", voucherId: this.voucher.voucherId, organisation: "", city: this.city, description: "", amount: 0, title: "", isActive: true, voucher: this.voucher,
    cityId: 0,
    date: ''
  };

  assignment$:Subscription= new Subscription;
  voucher$:Subscription= new Subscription;

  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const assignmentId = this.route.snapshot.paramMap.get('id');
    if (assignmentId != null) {
      this.assignment$ = this.assignmentService.getAssignmentById(+assignmentId).subscribe((result)=>{
        this.assignment=result;
      });

    }
  }
  back(){
    this.router.navigateByUrl('/assignments');
  }

}


