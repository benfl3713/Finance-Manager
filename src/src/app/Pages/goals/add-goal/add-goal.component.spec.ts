import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalComponent } from './add-goal.component';

describe('AddGoalComponent', () => {
  let component: AddGoalComponent;
  let fixture: ComponentFixture<AddGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
