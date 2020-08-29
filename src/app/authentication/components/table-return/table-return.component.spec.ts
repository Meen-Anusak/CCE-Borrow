import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReturnComponent } from './table-return.component';

describe('TableReturnComponent', () => {
  let component: TableReturnComponent;
  let fixture: ComponentFixture<TableReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
