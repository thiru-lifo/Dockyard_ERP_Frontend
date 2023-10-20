import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMasterComponent } from './status_master.component';

describe('StatusMasterComponent', () => {
  let component: StatusMasterComponent;
  let fixture: ComponentFixture<StatusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
