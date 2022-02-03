import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AddAdminFormComponent } from './add-admin-form/add-admin-form.component';
import { AddAdminComponent } from './admins/admins.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { CitiesComponent } from './cities/cities.component';
import { CityFormComponent } from './city-form/city-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InfluencerDetailComponent } from './influencer-detail/influencer-detail.component';
import { InfluencersFormComponent } from './influencers-form/influencers-form.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { AuthGuard } from './security/auth.guard';
import { SecurityComponent } from './security/security/security.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { VouchersFormComponent } from './vouchers-form/vouchers-form.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { EditAdminFormComponent } from './edit-admin-form/edit-admin-form.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'assignments', component: AssignmentsComponent, canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'influencers',component: InfluencersComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'influencers-form',component: InfluencersFormComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'assignment-form', component: AssignmentFormComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'vouchers', component: VouchersComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'vouchers-form', component: VouchersFormComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'admins', component: AddAdminComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'add-admin-form', component: AddAdminFormComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'edit-admin-form', component: EditAdminFormComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'cities', component: CitiesComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'account', component: AccountOverviewComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'city-form', component: CityFormComponent,canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'influencer/:id', component: InfluencerDetailComponent, canActivate:[AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'assignment/:id', component: AssignmentDetailComponent, canActivate:[AuthGuard],canActivateChild:[AuthGuard]},
  {path: 'voucher/:id', component: VoucherDetailComponent, canActivate:[AuthGuard],canActivateChild:[AuthGuard]},
  {path: 'admin/:id', component: AdminDetailComponent, canActivate:[AuthGuard],canActivateChild:[AuthGuard]},
  { path: 'login', component: SecurityComponent},
  { path: 'logout', component: SecurityComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
