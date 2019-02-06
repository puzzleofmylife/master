import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelper } from 'angular2-jwt';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { AlertComponent } from './components/alert/alert.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ChangePsychologistComponent } from './components/change-psychologist/change-psychologist.component';
import { ChangePackageComponent } from './components/changepackage/changepackage.component';
import { CheckoutResultComponent } from './components/checkout-result/checkout-result.component';
import { ConfirmEmailSendComponent } from './components/confirm-email-send/confirm-email-send.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationNavComponent } from './components/notification-nav/notification-nav.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PackageCreateUpdatesComponent } from './components/package-create-updates/package-create-updates.component';
import { PackageManageComponent } from './components/package-manage/package-manage.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PatientEditComponent } from './components/patient-edit/patient-edit.component';
import { PatientPersonalDetailsComponent } from './components/patient-personal-details/patient-personal-details.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientPsychologistComponent } from './components/patient-psychologist/patient-psychologist.component';
import { PatientSessionComponent } from './components/patient-session/patient-session.component';
import { PatientTermsComponent } from './components/patient-terms/patientterms.component';
import { PatientPackageComponent } from './components/patientpackage/patientpackage.component';
import { PatientRegisterComponent } from './components/patientregister/patientregister.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { PaymentUpdateComponent } from './components/payment-update/payment-update.component';
import { PsychologistListComponent } from './components/psychologist-list/psychologist-list.component';
import { PsychologistSessionComponent } from './components/psychologist-session/psychologist-session.component';
import { PsychologistUpdateComponent } from './components/psychologist-update/psychologist-update.component';
import { PsychologistComponent } from './components/psychologist/psychologist.component';
import { PsychtermsComponent } from './components/psychterms/psychterms.component';
import { PsyregisterComponent } from './components/psyregister/psyregister.component';
import { QuestionaireAnswersComponent } from './components/questionaire-answers/questionaire-answers.component';
import { ResetPasswordComponent } from './components/resetpassword/resetpassword.component';
import { ResultComponent } from './components/result/result.component';
import { SessionComponent } from './components/session/session.component';
import { SettleBalanceComponent } from './components/settle-balance/settle-balance.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { VerifyComponent } from './components/verify/verify.component';
import { VoucherCreateComponent } from './components/voucher-create/voucher-create.component';
import { VoucherGroupListComponent } from './components/voucher-group-list/voucher-group-list.component';
import { VouchersComponent } from './components/vouchers/vouchers.component';
import { ActionMenuDropdownDirective } from './directives/action-menu-dropdown.directive';
import { ActionMenuOriginDirective } from './directives/action-menu-origin.directive';
import { AlertService } from './services/alert.service';
import { CancelReasonComponent } from './components/cancel-reason/cancel-reason.component';
import { PsychologistHistoryComponent } from './components/psychologist-history/psychologist-history.component';
import { PsychologistPaymentsComponent } from './components/psychologist-payments/psychologist-payments.component';
import { SectionComponent } from './components/section/section.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { PsychologistBalanceComponent } from './components/psychologist-balance/psychologist-balance.component';
import { PsychologistTransactionsComponent } from './components/psychologist-transactions/psychologist-transactions.component';
import { PsychologistPauseComponent } from './components/psychologist-pause/psychologist-pause.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

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
		LoginComponent,
		PatientTermsComponent,
		PsychologistComponent,
		NotificationNavComponent,
		NotificationListComponent,
		SessionComponent,
		TimeAgoPipe,
		PatientSessionComponent,
		NotificationComponent,
		ChangePackageComponent,
		PatientPackageComponent,
		PatientProfileComponent,
		PaymentDetailsComponent,
		PaymentUpdateComponent,
		ResetPasswordComponent,
		ForgotPasswordComponent,
		PsychologistSessionComponent,
		QuestionaireAnswersComponent,
		PatientPsychologistComponent,
		ChangePsychologistComponent,
		ResultComponent,
		ConfirmEmailSendComponent,
		PatientPersonalDetailsComponent,
		SettleBalanceComponent,
		PatientEditComponent,
		PsychologistUpdateComponent,
		VoucherCreateComponent,
		VoucherGroupListComponent,
		VouchersComponent,
		PackagesComponent,
		PackageManageComponent,
		PackageCreateUpdatesComponent,
		PsychologistUpdateComponent,
		CancelReasonComponent,
		PsychologistHistoryComponent,
		PsychologistPaymentsComponent,
		SectionComponent,
		PromptComponent,
		PsychologistBalanceComponent,
		PsychologistTransactionsComponent,
		PsychologistPauseComponent,
		DatepickerComponent
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
