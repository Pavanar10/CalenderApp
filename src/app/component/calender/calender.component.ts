import { Component, EventEmitter, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NewAppointmentComponent } from '../new-appointment/new-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { CalenderServiceService } from 'src/app/services/calender-service.service';
import { Appointment } from '../interface/appointment';
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {
  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  officeHours = [
    { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
  ];
  timeSlots: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

    constructor(private matDialog:MatDialog,public calenderService:CalenderServiceService){}
      selectedDate: Date | null = null;
     appointmentDetails:Appointment[]=[];
  
  createAppointment() {
    console.log(this.selectedDate)
    if (this.selectedDate) {
        console.log("time",event)
        const matRef = this.matDialog.open(NewAppointmentComponent,{
          width:'500px'
        })
        console.log(this.calenderService.events)
    matRef.afterClosed().subscribe((result)=>{
      console.log("Result",result.data);
      this.appointmentDetails=result.data
      console.log(this.appointmentDetails)
    })
    } else {
      alert('Please select a date first.');
    }
  }
  getAppointmentsForTime(time: string): Appointment[] {
    let res = this.appointmentDetails.filter(appointment => appointment.startTime === time);
    return res
  }
  drop(event: CdkDragDrop<Appointment[]>,time:string) {
    console.log(event.currentIndex,event.previousIndex)
    if(event.previousContainer===event.container){ 
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
     }
    else{ 
     transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Update the appointment's time to the new time slot
      console.log(event.currentIndex)
      event.container.data[event.currentIndex].startTime = time; 
      console.log(event)
      console.log("app",this.appointmentDetails)
   }
  }

  dayName:string='';
  appointmentDate='';

  onSelect(event:Date){
    this.selectedDate= event;
    this.dayName=this.weekday[this.selectedDate.getDay()];
    this.appointmentDate=this.weekday[this.selectedDate.getUTCDate()];
  }
  delete(id:number){
    this.appointmentDetails.splice(id,1);
    console.log(this.appointmentDetails)
  }
}
