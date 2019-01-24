import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ChangePsychologistComponent } from './components/change-psychologist/change-psychologist.component';
import { ChangePackageComponent } from './components/changepackage/changepackage.component';
import { CheckoutResultComponent } from './components/checkout-result/checkout-result.component';
import { ConfirmEmailSendComponent } from './components/confirm-email-send/confirm-email-send.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PackageCreateUpdatesComponent } from './components/package-create-updates/package-create-updates.component';
import { PackageManageComponent } from './components/package-manage/package-manage.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientSessionComponent } from './components/patient-session/patient-session.component';
import { PatientTermsComponent } from './components/patient-terms/patientterms.component';
import { PatientRegisterComponent } from './components/patientregister/patientregister.component';
import { PaymentUpdateComponent } from './components/payment-update/payment-update.component';
import { PsychologistListComponent } from './components/psychologist-list/psychologist-list.component';
import { PsychologistSessionComponent } from './components/psychologist-session/psychologist-session.component';
import { PsychologistUpdateComponent } from './components/psychologist-update/psychologist-update.component';
import { PsychologistComponent } from './components/psychologist/psychologist.component';
import { PsychtermsComponent } from './components/psychterms/psychterms.component';
import { PsyregisterComponent } from './components/psyregister/psyregister.component';
import { ResetPasswordComponent } from './components/resetpassword/resetpassword.component';
import { SettleBalanceComponent } from './components/settle-balance/settle-balance.component';
import { VerifyComponent } from './components/verify/verify.component';
import { VoucherCreateComponent } from './components/voucher-create/voucher-create.component';
import { VoucherGroupListComponent } from './components/voucher-group-list/voucher-group-list.component';
import { VouchersComponent } from './components/vouchers/vouchers.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'apply/psychologist', component: PsyregisterComponent },
  { path: 'apply', component: ApplyComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'psychologist-terms', component: PsychtermsComponent },
  { path: 'patient-terms', component: PatientTermsComponent },
  { path: 'signup', component: PatientRegisterComponent },
  { path: 'card/result', component: CheckoutResultComponent },
  { path: 'admin/psychologists', component: PsychologistListComponent },
  { path: 'psychologist/patients', component: PsychologistSessionComponent },
  { path: 'profile/change-psychologist', component: ChangePsychologistComponent },
  { path: 'profile/psychologist/:id', component: PsychologistComponent },
  { path: 'profile/psychologist', component: PsychologistComponent },
  { path: 'session', component: PatientSessionComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'update-card', component: PaymentUpdateComponent },
  { path: 'profile', component: PatientProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirmemail/send', component: ConfirmEmailSendComponent },
  { path: 'update-card', component: PaymentUpdateComponent },
  { path: 'profile', component: PatientProfileComponent },
  { path: 'profile/update-details', component: PatientEditComponent },
  { path: 'profile/change-package', component: ChangePackageComponent },
  { path: 'settle-balance', component: SettleBalanceComponent },
  { path: 'edit-patient/:id', component: PatientEditComponent },
  { path: 'profile/psychologist/update/:id', component: PsychologistUpdateComponent },
  { path: 'admin/create-voucher', component: VoucherCreateComponent },
  { path: 'admin/vouchers', component: VoucherGroupListComponent },
  { path: 'admin/vouchers/:id/:voucherGroupName', component: VouchersComponent },
  { path: 'profile/update-details', component: PatientEditComponent },
  { path: 'profile/change-package', component: ChangePackageComponent },
  { path: 'settle-balance', component: SettleBalanceComponent },
  { path: 'edit-patient/:id', component: PatientEditComponent },
  { path: 'admin/packages', component: PackageManageComponent },
  { path: 'admin/package/edit/:id', component: PackageCreateUpdatesComponent },
  { path: 'admin/package/create', component: PackageCreateUpdatesComponent },
  { path: 'profile/psychologist/update/:id', component: PsychologistUpdateComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }