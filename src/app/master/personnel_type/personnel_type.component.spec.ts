import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelTypeComponent } from './personnel_type.component';

describe('PersonnelTypeComponent', () => {
  let component: PersonnelTypeComponent;
  let fixture: ComponentFixture<PersonnelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
