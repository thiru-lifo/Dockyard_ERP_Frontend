import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionsMasterComponent } from './deductions_master.component';

describe('DeductionsMasterComponent', () => {
  let component: DeductionsMasterComponent;
  let fixture: ComponentFixture<DeductionsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeductionsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductionsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
