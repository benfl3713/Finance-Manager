import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransferTransactionComponent } from './add-transfer-transaction.component';

describe('AddTransferTransactionComponent', () => {
  let component: AddTransferTransactionComponent;
  let fixture: ComponentFixture<AddTransferTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransferTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransferTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
