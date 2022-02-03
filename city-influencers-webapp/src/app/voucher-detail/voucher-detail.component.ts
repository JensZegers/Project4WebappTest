import { Component, OnInit } from '@angular/core';
import { Voucher} from '../voucher';
import { VoucherService } from '../voucher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {
  voucher: Voucher= {
    voucherId: 0,
    url: '',
    organisation: '',
    value: '',
    description: ''
  };

  voucher$:Subscription= new Subscription;

  constructor(private voucherService:VoucherService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const voucherId = this.route.snapshot.paramMap.get('id');
    if (voucherId != null) {
      this.voucher$ = this.voucherService.getVoucherById(+voucherId).subscribe((result)=>{
        this.voucher=result;
      });

    }
  }
  back(){
    this.router.navigateByUrl('/vouchers');
  }

}

