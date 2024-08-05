import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalenderServiceService } from 'src/app/services/calender-service.service';
import { Appointment } from '../interface/appointment';


@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {



  createForm:FormGroup = this.fb.group({
    'date':this.data,
    'startTime':['',[Validators.required]],
    'endTime':['',[Validators.required]],
    'description':['',[Validators.required,Validators.maxLength(100)]],

  })
  appointments:Appointment[]=[];
  title:string=''
  timeSlots: string[] = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  constructor(public dialogRef:MatDialogRef<NewAppointmentComponent>, @Inject(MAT_DIALOG_DATA) public data: any
    ,private fb:FormBuilder,public calenderService:CalenderServiceService){}
ngOnInit(){
  console.log(this.data)
}

  create(){
       this.appointments.push(this.createForm.value);
   
      this.calenderService.events.push(this.createForm.value);
      this.dialogRef.close({data:this.appointments})
  }

  close(){
    this.dialogRef.close()
  }
}
