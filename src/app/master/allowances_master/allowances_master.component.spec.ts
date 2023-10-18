import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowancesMasterComponent } from './allowances_master.component';

describe('AllowancesMasterComponent', () => {
  let component: AllowancesMasterComponent;
  let fixture: ComponentFixture<AllowancesMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowancesMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowancesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
