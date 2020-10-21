import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSplitTransactionComponent } from './add-split-transaction.component';

describe('AddSplitTransactionComponent', () => {
  let component: AddSplitTransactionComponent;
  let fixture: ComponentFixture<AddSplitTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSplitTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSplitTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
