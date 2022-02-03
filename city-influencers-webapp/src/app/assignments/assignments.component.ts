import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Assignment } from '../assignment';
import { AssignmentsService } from '../assignments.service';
import { Voucher } from '../voucher';
import { VoucherService } from '../voucher.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {


  assignments: Assignment[] = [];
  vouchers: Voucher[] = [];

  assignments$: Subscription = new Subscription();
  vouchers$: Subscription = new Subscription();
  deleteAssignment$: Subscription = new Subscription();
  putAssignment$: Subscription = new Subscription();

  errorMessage: string = '';
  isLoading: Boolean = true;

  constructor(private assignmentService: AssignmentsService, private voucherService: VoucherService, private router: Router) { }

  ngOnInit(): void {
    this.getAssignments();
    this.getVouchers();
  }
  ngOnDestroy(): void {
    this.assignments$.unsubscribe();
    this.deleteAssignment$.unsubscribe();
    this.putAssignment$.unsubscribe();
    this.vouchers$.unsubscribe();
  }

  add() {
    this.router.navigate(['assignment-form'], {state: {mode: 'add'}});
  }

  edit(id: number){
    this.router.navigate(['assignment-form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number){
    this.deleteAssignment$ = this.assignmentService.deleteAssigments(id).subscribe(result => {
      this.getAssignments();
    }, error => {
      this.errorMessage = error.message;
    });
  }

  getAssignments(){
    this.assignments$ = this.assignmentService.getAssignments().subscribe((result) => {
      this.assignments = result;
      this.isLoading = false;
    });
  }

  getVouchers(){
    this.vouchers$ = this.voucherService.getVouchers().subscribe(result => this.vouchers = result);
  }

  toggleActive(assignment: Assignment){
    assignment.isActive = !assignment.isActive;

    this.putAssignment$ = this.assignmentService.putAssigment(assignment.assignmentId, assignment).subscribe((result) => {
      this.getAssignments();
    },
    (error) => {
      this.errorMessage = error.message;
    }
    );
  }
  toDetail(id:number){
    this.router.navigateByUrl("/assignment/"+id);
  }


}
