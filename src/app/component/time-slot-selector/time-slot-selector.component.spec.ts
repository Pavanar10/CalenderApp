import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotSelectorComponent } from './time-slot-selector.component';

describe('TimeSlotSelectorComponent', () => {
  let component: TimeSlotSelectorComponent;
  let fixture: ComponentFixture<TimeSlotSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSlotSelectorComponent]
    });
    fixture = TestBed.createComponent(TimeSlotSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
