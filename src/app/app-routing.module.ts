import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplyComponent } from './components/apply/apply.component';
import { CheckoutResultComponent } from './components/checkout-result/checkout-result.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PatientSessionComponent } from './components/patient-session/patient-session.component';
import { PatientTermsComponent } from './components/patient-terms/patientterms.component';
import { PatientRegisterComponent } from './components/patientregister/patientregister.component';
import { PaymentUpdateComponent } from './components/payment-update/payment-update.component';
import { PsychologistListComponent } from './components/psychologist-list/psychologist-list.component';
import { PsychologistComponent } from './components/psychologist/psychologist.component';
import { PsychtermsComponent } from './components/psychterms/psychterms.component';
import { PsyregisterComponent } from './components/psyregister/psyregister.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/resetpassword/resetpassword.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';

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
  { path: 'psychologist-details/:id', component: PsychologistComponent },
  { path: 'session', component: PatientSessionComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'update-card', component: PaymentUpdateComponent },
  { path: 'profile', component: PatientProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
	
];

@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(routes)
	],
	bootstrap: [AppComponent]
})
export class AppRoutingModule { }