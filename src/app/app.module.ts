import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { AlertComponent } from './components/alert/alert.component';
import { ApplyComponent } from './components/apply/apply.component';
import { CheckoutResultComponent } from './components/checkout-result/checkout-result.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PsychologistListComponent } from './components/psychologist-list/psychologist-list.component';
import { PsychtermsComponent } from './components/psychterms/psychterms.component';
import { PsyregisterComponent } from './components/psyregister/psyregister.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { PatientRegisterComponent } from './components/patientregister/patientregister.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ActionMenuDropdownDirective } from './directives/action-menu-dropdown.directive';
import { ActionMenuOriginDirective } from './directives/action-menu-origin.directive';
import { AlertService } from './services/alert.service';
import { LoginComponent } from './components/login/login.component';
import { PatientTermsComponent } from './components/patient-terms/patientterms.component';
import { JwtHelper } from 'angular2-jwt';
import { PsychologistComponent } from './components/psychologist/psychologist.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotificationListComponent } from './components/notification-list/notification-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PsyregisterComponent,
    AlertComponent,
    VerifyComponent,
    PsychtermsComponent,
    ActionMenuOriginDirective,
    ActionMenuDropdownDirective,
    ActionMenuComponent,
    PatientRegisterComponent,
    ApplyComponent,
    TooltipComponent,
    CheckoutResultComponent,
    ApplyComponent,
    PsychologistListComponent,
    TimeAgoPipe,

    LoginComponent,
    PatientTermsComponent,
    PsychologistComponent,
    NotificationsComponent,
    NotificationListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AlertService, JwtHelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
