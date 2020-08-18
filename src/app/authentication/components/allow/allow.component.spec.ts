import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowComponent } from './allow.component';

describe('AllowComponent', () => {
  let component: AllowComponent;
  let fixture: ComponentFixture<AllowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
