import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Voucher} from '../voucher';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { VoucherService } from '../voucher.service';
import { subscribeOn } from 'rxjs/operators';


@Component({
  selector: 'app-vouchers-form',
  templateUrl: './vouchers-form.component.html',
  styleUrls: ['./vouchers-form.component.scss']
})
export class VouchersFormComponent implements OnInit,OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  voucherId: number = 0;

  voucher: Voucher = {voucherId:0, url:"",organisation:"",value:"",description:""}

  isSubmitted: boolean = false;
  errorMessage: string = '';

  voucher$: Subscription = new Subscription();
  postVoucher$:Subscription= new Subscription();
  putVoucher$: Subscription = new Subscription();

  constructor(private router: Router, private voucherService: VoucherService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.voucherId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.voucherId != null && this.voucherId > 0) {
      this.voucher$ = this.voucherService.getVoucherById(this.voucherId).subscribe(result => {this.voucher = result});
    }
   }
   ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.voucher$.unsubscribe();
    this.postVoucher$.unsubscribe();
    this.putVoucher$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd){
      this.postVoucher$ = this.voucherService.postVoucher(this.voucher).subscribe(result => {
        this.router.navigateByUrl("/vouchers");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putVoucher$ = this.voucherService.putVoucher(this.voucherId, this.voucher).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/vouchers");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

}
