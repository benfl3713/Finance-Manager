import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthPortfolioComponent } from './wealth-portfolio.component';

describe('WealthPortfolioComponent', () => {
  let component: WealthPortfolioComponent;
  let fixture: ComponentFixture<WealthPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WealthPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
