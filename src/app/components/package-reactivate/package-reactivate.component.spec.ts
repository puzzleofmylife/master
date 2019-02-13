import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageReactivateComponent } from './package-reactivate.component';

describe('PackageReactivateComponent', () => {
  let component: PackageReactivateComponent;
  let fixture: ComponentFixture<PackageReactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageReactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageReactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
