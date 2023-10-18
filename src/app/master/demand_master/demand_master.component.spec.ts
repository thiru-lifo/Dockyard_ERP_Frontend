import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandMasterComponent } from './demand_master.component';

describe('DemandMasterComponent', () => {
  let component: DemandMasterComponent;
  let fixture: ComponentFixture<DemandMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
