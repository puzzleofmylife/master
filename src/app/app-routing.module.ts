import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApplyComponent } from './components/apply/apply.component';
import { CheckoutResultComponent } from './components/checkout-result/checkout-result.component';
import { HomeComponent } from './components/home/home.component';
import { PsychologistListComponent } from './components/psychologist-list/psychologist-list.component';
import { PsychtermsComponent } from './components/psychterms/psychterms.component';
import { PsyregisterComponent } from './components/psyregister/psyregister.component';
import { PatientRegisterComponent } from './components/useregister/patientregister.component';
import { VerifyComponent } from './components/verify/verify.component';
import { PsychoService } from './services/psycho.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'apply/psychologist', component: PsyregisterComponent },
  { path: 'apply', component: ApplyComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'psychologist-terms', component: PsychtermsComponent },
  { path: 'signup', component: PatientRegisterComponent },
  { path: 'card/result', component: CheckoutResultComponent },
  { path: 'admin', component: PsychologistListComponent },

];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [PsychoService],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }