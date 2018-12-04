import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepackageComponent } from './changepackage.component';

describe('ChangepackageComponent', () => {
  let component: ChangepackageComponent;
  let fixture: ComponentFixture<ChangepackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
