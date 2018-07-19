import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferenceChartComponent } from './difference-chart.component';

describe('DifferenceChartComponent', () => {
  let component: DifferenceChartComponent;
  let fixture: ComponentFixture<DifferenceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifferenceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferenceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
