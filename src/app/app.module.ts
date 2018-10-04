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
import { NglModule } from 'ng-lightning/ng-lightning';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { SignupMenuComponent } from './components/signup-menu/signup-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PsyregisterComponent,
    AlertComponent,
    VerifyComponent,
    MobileMenuComponent,
    SignupMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NglModule.forRoot()
  ],
  providers: [AlertService, PsychoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
