import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayScaleComponent } from './pay_scale.component';

describe('UnitComponent', () => {
  let component: PayScaleComponent;
  let fixture: ComponentFixture<PayScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
