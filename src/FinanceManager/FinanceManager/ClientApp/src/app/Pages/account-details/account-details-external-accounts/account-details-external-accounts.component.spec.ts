import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsExternalAccountsComponent } from './account-details-external-accounts.component';

describe('AccountDetailsExternalAccountsComponent', () => {
  let component: AccountDetailsExternalAccountsComponent;
  let fixture: ComponentFixture<AccountDetailsExternalAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsExternalAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsExternalAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
