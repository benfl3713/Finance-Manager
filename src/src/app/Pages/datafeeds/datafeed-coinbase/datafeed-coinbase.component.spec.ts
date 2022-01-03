import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafeedCoinbaseComponent } from './datafeed-coinbase.component';

describe('DatafeedCoinbaseComponent', () => {
  let component: DatafeedCoinbaseComponent;
  let fixture: ComponentFixture<DatafeedCoinbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafeedCoinbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafeedCoinbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
