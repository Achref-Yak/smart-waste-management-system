import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashChartComponent } from './dash-chart.component';

describe('DashChartComponent', () => {
  let component: DashChartComponent;
  let fixture: ComponentFixture<DashChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
