import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionComponent } from './add-transaction.component';

describe('AddTransactionComponent', () => {
  let component: AddTransactionComponent;
  let fixture: ComponentFixture<AddTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
