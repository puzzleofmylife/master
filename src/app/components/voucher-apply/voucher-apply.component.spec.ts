import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherApplyComponent } from './voucher-apply.component';

describe('VoucherApplyComponent', () => {
  let component: VoucherApplyComponent;
  let fixture: ComponentFixture<VoucherApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
