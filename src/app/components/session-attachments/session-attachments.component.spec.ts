import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAttachmentsComponent } from './session-attachments.component';

describe('SessionAttachmentsComponent', () => {
  let component: SessionAttachmentsComponent;
  let fixture: ComponentFixture<SessionAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
