import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafeedsListComponent } from './datafeeds-list.component';

describe('DatafeedsListComponent', () => {
  let component: DatafeedsListComponent;
  let fixture: ComponentFixture<DatafeedsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafeedsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafeedsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
