import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailSendComponent } from './confirm-email-send.component';

describe('ConfirmEmailSendComponent', () => {
  let component: ConfirmEmailSendComponent;
  let fixture: ComponentFixture<ConfirmEmailSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEmailSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
