import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { City } from '../city';
import { CityService } from '../city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnDestroy {

  cities: City[] = [];

  cities$: Subscription = new Subscription();
  putCity$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private cityService: CityService, private router: Router) { }

  ngOnInit(): void {
    this.getCities();
  }

  ngOnDestroy(){
    this.cities$.unsubscribe();
    this.putCity$.unsubscribe();
  }

  add(){
    this.router.navigate(['city-form'], {state: {mode: 'add'}});
  }

  edit(id: number){
    this.router.navigate(['city-form'], {state: {id: id, mode: 'edit'}});
  }

  toggleActive(city: City){
    city.isActive = !city.isActive;
    this.putCity$ = this.cityService.putCity(city.cityId, city).subscribe((result) => {
      this.getCities();
    }, (error) => {
      this.errorMessage = error.message;
    });
  }

  getCities(){
    this.cities$ = this.cityService.getCities().subscribe(result => this.cities = result);
  }

}
