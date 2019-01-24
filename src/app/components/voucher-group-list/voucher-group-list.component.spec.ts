import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherGroupListComponent } from './voucher-group-list.component';

describe('VoucherGroupListComponent', () => {
  let component: VoucherGroupListComponent;
  let fixture: ComponentFixture<VoucherGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
