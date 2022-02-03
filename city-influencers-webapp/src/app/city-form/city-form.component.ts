import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { City } from '../city';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  cityId: number = 0;

  city: City = {
    cityId: 0,
    zipcode: '',
    name: '',
    isActive: true
  }

  isSubmitted: boolean = false;
  errorMessage: string = '';

  city$: Subscription = new Subscription();
  postCity$: Subscription = new Subscription();
  putCity$: Subscription = new Subscription();

  constructor(private router: Router, private cityService: CityService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.cityId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.cityId != null && this.cityId>0){
      this.city$ = this.cityService.getCityById(this.cityId).subscribe(result => {this.city = result});
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.city$.unsubscribe();
      this.postCity$.unsubscribe();
      this.putCity$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd){
      this.postCity$ = this.cityService.postCity(this.city).subscribe(result => {
        this.router.navigateByUrl("/cities");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putCity$ = this.cityService.putCity(this.cityId, this.city).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/cities");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

}
