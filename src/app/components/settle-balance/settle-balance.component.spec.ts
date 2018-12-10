import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleBalanceComponent } from './settle-balance.component';

describe('SettleBalanceComponent', () => {
  let component: SettleBalanceComponent;
  let fixture: ComponentFixture<SettleBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettleBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
