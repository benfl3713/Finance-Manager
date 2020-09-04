import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafeedsComponent } from './datafeeds.component';

describe('DatafeedsComponent', () => {
  let component: DatafeedsComponent;
  let fixture: ComponentFixture<DatafeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
