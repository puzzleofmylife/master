import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMenuComponent } from './signup-menu.component';

describe('SignupMenuComponent', () => {
  let component: SignupMenuComponent;
  let fixture: ComponentFixture<SignupMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
