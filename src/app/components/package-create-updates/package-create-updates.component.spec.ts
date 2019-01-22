import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCreateUpdatesComponent } from './package-create-updates.component';

describe('PackageCreateUpdatesComponent', () => {
  let component: PackageCreateUpdatesComponent;
  let fixture: ComponentFixture<PackageCreateUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageCreateUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageCreateUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
