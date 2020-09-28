import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceHistoryChartComponent } from './balance-history-chart.component';

describe('BalanceHistoryChartComponent', () => {
  let component: BalanceHistoryChartComponent;
  let fixture: ComponentFixture<BalanceHistoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceHistoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceHistoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
