import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLogComponent } from './stock_log.component';

describe('StockLogComponent', () => {
  let component: StockLogComponent;
  let fixture: ComponentFixture<StockLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
