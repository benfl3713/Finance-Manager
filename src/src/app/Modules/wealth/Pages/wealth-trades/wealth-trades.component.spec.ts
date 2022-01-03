import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthTradesComponent } from './wealth-trades.component';

describe('WealthTradesComponent', () => {
  let component: WealthTradesComponent;
  let fixture: ComponentFixture<WealthTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WealthTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
