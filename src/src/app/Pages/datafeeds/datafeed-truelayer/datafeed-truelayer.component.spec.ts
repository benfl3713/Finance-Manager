import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafeedTruelayerComponent } from './datafeed-truelayer.component';

describe('DatafeedTruelayerComponent', () => {
  let component: DatafeedTruelayerComponent;
  let fixture: ComponentFixture<DatafeedTruelayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafeedTruelayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafeedTruelayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
