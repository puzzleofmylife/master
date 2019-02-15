import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAttachmentUploadComponent } from './session-attachment-upload.component';

describe('SessionAttachmentUploadComponent', () => {
  let component: SessionAttachmentUploadComponent;
  let fixture: ComponentFixture<SessionAttachmentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionAttachmentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAttachmentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
