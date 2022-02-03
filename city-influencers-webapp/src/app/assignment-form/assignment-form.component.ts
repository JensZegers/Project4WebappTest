import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostAssignment } from './post-assignment';
import { AssignmentsService } from '../assignments.service';
import { City } from '../city';
import { CityService } from '../city.service';
import { Voucher } from '../voucher';
import { VoucherService } from '../voucher.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  assignmentId: number = 0;

  voucher: Voucher = {
    voucherId: 0,
    url: '',
    organisation: '',
    value: '',
    description: ''
  }

  assignment: PostAssignment = {
    assignmentId: 0,
    voucherId: this.router.getCurrentNavigation()?.extras.state?.voucherId,
    title: '',
    image: '',
    amount: 1,
    isActive: true,
    organisation: '',
    cityId: this.router.getCurrentNavigation()?.extras.state?.cityId,
    description: '',
    date: ''
  }

  vouchers: Voucher[] = [];
  isSubmitted: boolean = false;

  cities: City[] = [];
  cities$: Subscription = new Subscription();

  errorMessage: string = '';

  assignment$: Subscription = new Subscription();
  postAssignment$: Subscription = new Subscription();
  putAssignment$: Subscription = new Subscription();
  postVoucher$: Subscription = new Subscription();
  vouchers$: Subscription = new Subscription();

  constructor(private cityService: CityService ,private router: Router, private assignmentService: AssignmentsService, private voucherService: VoucherService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.assignmentId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.assignmentId != null && this.assignmentId > 0){
      this.assignment$ = this.assignmentService.getAssignmentById(this.assignmentId).subscribe(result => {this.assignment = result});
    }
   }

  ngOnInit(): void {
    this.getCities();
  }

  ngOnDestroy(): void {
      this.assignment$.unsubscribe();
      this.postAssignment$.unsubscribe();
      this.putAssignment$.unsubscribe();
      this.cities$.unsubscribe();
      this.postVoucher$.unsubscribe();
  }

  getCities(){
    this.cities$ = this.cityService.getCities().subscribe((result) => {
      result.forEach((city) => {
        if (city.isActive){
          this.cities.push(city);
        }
      })
    })
  }

  handleUploadSuccess(event: any){
    this.assignment.image = event.url;
    console.log('File upload success with a response: ',event);
  }

  handleUploadError(event: any) {
    console.log('There was an error in upload: ', event);
  }

  handleFileInput(event: any) {
    console.log('This is the event on file change: ', event);
  }

  onSubmit(): void{
    this.isSubmitted = true;

    if (this.isAdd){
      this.postVoucher$ = this.voucherService.postVoucher(this.voucher).subscribe(result => {
        this.assignment.voucherId = result.voucherId;
        this.postAssignment$ = this.assignmentService.postAssignment(this.assignment).subscribe(result => {
          this.router.navigateByUrl("/assignments");
        },
        error => {
          this.errorMessage = error.message;
        });
      });
    }
    if (this.isEdit){
      this.putAssignment$ = this.assignmentService.putAssigment(this.assignmentId, this.assignment).subscribe(result => {
        this.router.navigateByUrl("/assignments");
      },
      error => {
        this.errorMessage = error.message;
      })
    }
  }

}
