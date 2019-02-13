import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCancelComponent } from './package-cancel.component';

describe('PackageCancelComponent', () => {
  let component: PackageCancelComponent;
  let fixture: ComponentFixture<PackageCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
