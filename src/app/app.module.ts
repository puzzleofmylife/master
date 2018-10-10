import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { PsyregisterComponent } from './components/psyregister/psyregister.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { PsychoService } from './services/psycho.service';
import { HttpClientModule } from '@angular/common/http';
import { VerifyComponent } from './components/verify/verify.component';
import { PsychtermsComponent } from './components/psychterms/psychterms.component';
import { ActionMenuOriginDirective } from './directives/action-menu-origin.directive';
import { ActionMenuDropdownDirective } from './directives/action-menu-dropdown.directive';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { UserRegisterComponent } from './components/useregister/useregister.component';


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
    UserRegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AlertService, PsychoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
