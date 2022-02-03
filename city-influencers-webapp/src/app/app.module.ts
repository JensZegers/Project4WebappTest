import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InfluencersListComponent } from './influencers-list/influencers-list.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AssignmentsComponent } from './assignments/assignments.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { InfluencersFormComponent } from './influencers-form/influencers-form.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VouchersFormComponent } from './vouchers-form/vouchers-form.component';
import { SecurityModule } from './security/security.module';
import { InfluencerDetailComponent } from './influencer-detail/influencer-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { AddAdminComponent } from './admins/admins.component';
import { AddAdminFormComponent } from './add-admin-form/add-admin-form.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { CitiesComponent } from './cities/cities.component';
import { CityFormComponent } from './city-form/city-form.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { SocialsComponent } from './socials/socials.component';
import { InfluencerCardComponent } from './influencer-card/influencer-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { EditAdminFormComponent } from './edit-admin-form/edit-admin-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    InfluencersListComponent,
    PostsListComponent,
    AssignmentsComponent,
    InfluencersComponent,
    InfluencersFormComponent,
    AssignmentFormComponent,
    VouchersComponent,
    VouchersFormComponent,
    InfluencerDetailComponent,
    DashboardComponent,
    AssignmentDetailComponent,
    VoucherDetailComponent,
    AddAdminComponent,
    AddAdminFormComponent,
    AdminDetailComponent,
    CitiesComponent,
    CityFormComponent,
    AccountOverviewComponent,
    SocialsComponent,
    InfluencerCardComponent,
    EditAdminFormComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SecurityModule,
    ImagekitioAngularModule.forRoot({
      publicKey: "public_U/smjTbaa+pKidqUDf+/HLEtlcc=",
      urlEndpoint: "https://ik.imagekit.io/m7dlwque3gp",
      authenticationEndpoint: "https://cityinfluencers.azurewebsites.net/api/users/imgkit"
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
