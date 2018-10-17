import { UserRegisterComponent } from './components/useregister/useregister.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PsyregisterComponent } from './components/psyregister/psyregister.component';
import { PsychoService } from './services/psycho.service';
import { AppComponent } from './app.component';
import { VerifyComponent } from './components/verify/verify.component';
import { PsychtermsComponent } from './components/psychterms/psychterms.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'apply/psychologist', component: PsyregisterComponent },
  {path: 'verify', component: VerifyComponent },
  {path: 'psychterms', component: PsychtermsComponent },
  {path: 'useregister', component: UserRegisterComponent}
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