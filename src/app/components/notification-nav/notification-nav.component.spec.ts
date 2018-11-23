import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationNavComponent } from './notification-nav.component';

describe('NotificationsComponent', () => {
  let component: NotificationNavComponent;
  let fixture: ComponentFixture<NotificationNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
