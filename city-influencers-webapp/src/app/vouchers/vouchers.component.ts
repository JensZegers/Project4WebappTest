import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Voucher } from '../voucher';
import { VoucherService } from '../voucher.service';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {

  vouchers: Voucher[] = [];

  vouchers$: Subscription = new Subscription();
  deleteVoucher$: Subscription = new Subscription();
  putVoucher$: Subscription = new Subscription();

  errorMessage: string = '';
  isLoading: Boolean = true;
  constructor(private vouchersService: VoucherService, private router: Router) { }

  ngOnInit(): void {
    this.getVouchers();
  }
  ngOnDestroy(): void{
    this.vouchers$.unsubscribe();
    this.deleteVoucher$.unsubscribe();
    this.putVoucher$.unsubscribe();
  }
  add() {
    this.router.navigate(['vouchers-form'], {state: {mode: 'add'}});
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['vouchers-form'], {state: {id: id, mode: 'edit'}});
  }

  delete(id: number) {
    this.deleteVoucher$ = this.vouchersService.deleteVoucher(id).subscribe(result => {
      //all went well
      this.getVouchers();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getVouchers(){
    this.vouchers$ = this.vouchersService.getVouchers().subscribe((result) => {
      this.vouchers = result;
      this.isLoading = false;
    })
  }
  toDetail(id:number){
    this.router.navigateByUrl("/voucher/"+id);
  }


}
