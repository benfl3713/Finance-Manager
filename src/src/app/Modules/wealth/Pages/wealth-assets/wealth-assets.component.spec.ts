import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthAssetsComponent } from './wealth-assets.component';

describe('WealthAssetsComponent', () => {
  let component: WealthAssetsComponent;
  let fixture: ComponentFixture<WealthAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WealthAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
