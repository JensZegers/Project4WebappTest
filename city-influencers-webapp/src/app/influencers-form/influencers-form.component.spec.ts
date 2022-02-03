import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencersFormComponent } from './influencers-form.component';

describe('InfluencersFormComponent', () => {
  let component: InfluencersFormComponent;
  let fixture: ComponentFixture<InfluencersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
