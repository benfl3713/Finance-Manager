import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpentPerCategoryChartComponent } from './spent-per-category-chart.component';

describe('SpentPerCategoryChartComponent', () => {
  let component: SpentPerCategoryChartComponent;
  let fixture: ComponentFixture<SpentPerCategoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpentPerCategoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpentPerCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
