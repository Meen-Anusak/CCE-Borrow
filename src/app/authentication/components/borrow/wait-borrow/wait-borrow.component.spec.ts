import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitBorrowComponent } from './wait-borrow.component';

describe('WaitBorrowComponent', () => {
  let component: WaitBorrowComponent;
  let fixture: ComponentFixture<WaitBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
