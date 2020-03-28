import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcelledOrderComponent } from './concelled-order.component';

describe('ConcelledOrderComponent', () => {
  let component: ConcelledOrderComponent;
  let fixture: ComponentFixture<ConcelledOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcelledOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcelledOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
