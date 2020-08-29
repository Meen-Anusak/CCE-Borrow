import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBorrowComponent } from './return-borrow.component';

describe('ReturnBorrowComponent', () => {
  let component: ReturnBorrowComponent;
  let fixture: ComponentFixture<ReturnBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
