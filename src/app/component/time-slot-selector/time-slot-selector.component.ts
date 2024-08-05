import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-time-slot-selector',
  templateUrl: './time-slot-selector.component.html',
  styleUrls: ['./time-slot-selector.component.scss']
})
export class TimeSlotSelectorComponent {
  @Input() selectedDate!: Date;
  @Input() appointments: any[] = [];
  @Output() timeSelected = new EventEmitter<string>();

  timeSlots: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  isBooked(time: string): boolean {
    console.log(this.appointments)
    return this.appointments.some(
      appointment => appointment.date.toDateString() === this.selectedDate.toDateString() && appointment.time === time
    );
  }


  selectTime(time: any) {
    console.log(time)
    if (!this.isBooked(time)) {
      this.timeSelected.emit(time);
    }
  }
}
