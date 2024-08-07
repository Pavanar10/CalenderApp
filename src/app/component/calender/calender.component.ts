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

  dayName:string='';
  appointmentDate='';

    constructor(private matDialog:MatDialog,public calenderService:CalenderServiceService){}
      selectedDate!: Date;
     appointmentDetails:Appointment[]=[];
     appointments:Appointment[]=[];

  ngOnInit() {
    this.calenderService.getEvents().subscribe(
      (res) => {
        let date = new Date();
        let datestr = date.getDate() + '-' + Number(date.getMonth() + 1).toString() + '-' + date.getFullYear();
        this.appointments = res;
        this.appointmentDetails = res.filter((x) => x.date === datestr);
      },

      (err) => {
        console.log("Error", err)
      }
    )

  }
  
  createAppointment() {
    let dateToday=new Date();
    if (this.selectedDate && this.selectedDate>=dateToday) {
      const matRef = this.matDialog.open(NewAppointmentComponent, {
        width: '500px', data: { dateData: this.selectedDate }
      })
      matRef.afterClosed().subscribe((result) => {
        this.appointmentDetails = this.calenderService.events;
        let datestr = this.selectedDate.getDate() + '-' + Number(this.selectedDate.getMonth() + 1).toString() + '-' + this.selectedDate.getFullYear();


        this.appointmentDetails[this.appointmentDetails.length-1].date = datestr;
        //post data
        this.calenderService.addEvent(this.appointmentDetails[this.appointmentDetails.length-1]).subscribe
          (
            (res) => {
              console.log("Details posted", res);
              console.log("afteradd",this.appointmentDetails)
              this.appointmentDetails=this.appointmentDetails.filter((x)=>x.date===this.dateStr)
            },
            (err) => { console.log("Error", err) }
          )
      })
    } else {
      alert('Please select a available date.');
    }
  }
  getAppointmentsForTime(time: string): Appointment[] {

    let res = this.appointmentDetails.filter(appointment => appointment.startTime === time);
    return res
  }
  drop(event: CdkDragDrop<Appointment[]>,time:string) {
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
      event.container.data[event.currentIndex].startTime = time; 
      //call update function
      this.calenderService.updateEvents(this.appointmentDetails[0].id,this.appointmentDetails[0]).subscribe(
        (response)=>{console.log("Response",response)},
        (error)=>{console.log("Error",error)}
      )
   }
  }
dateStr='';
  onSelect(event:Date){
    this.selectedDate= event;
    this.dayName=this.weekday[this.selectedDate.getDay()];
    this.appointmentDate=this.weekday[this.selectedDate.getUTCDate()];
     this.dateStr = this.selectedDate.getDate()+'-'+Number(this.selectedDate.getMonth()+1).toString()+'-'+this.selectedDate.getFullYear();
    this.calenderService.getEvents().subscribe(
      (res)=>this.appointments=res,
      (err)=>console.log(err)
    )
    this.appointmentDetails=this.appointments.filter((x)=>x.date===this.dateStr)
    console.log("after filter",this.dateStr,this.appointmentDetails)

  }
  delete(id: any) {
    // this.appointmentDetails.splice(id,1);
    console.log(id);
    this.calenderService.deleteEvents(id).subscribe(
      (res) => {console.log("Event Successfully deleted");
    //  console.log(this.calenderService.events) 
        this.calenderService.getEvents().subscribe(
          (res)=>{
            this.appointmentDetails=res.filter((x)=>x.date===this.dateStr)
          }
        )
    },
      (err) => console.log("Error", err)
    )
  }
}
