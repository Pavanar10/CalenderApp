import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../component/interface/appointment';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalenderServiceService {
public events:Appointment[]=[];

  constructor(private http:HttpClient) { 
    this.getEvents().subscribe(
      (res)=>{
        this.events=res
      },
    (err)=>{
      console.log("Error");
    })
  }

  addEvent(data:Appointment):Observable<Appointment>{
    
  return this.http.post<Appointment>('http://localhost:3000/events',data);
  
  }

  getEvents():Observable<Appointment[]>{
    return this.http.get<Appointment[]>('http://localhost:3000/events');
  }

  deleteEvents(id:any):Observable<any>{
    return this.http.delete('http://localhost:3000/events/'+id);
  }

  updateEvents(id:any,appointmant:Appointment):Observable<Appointment>{
    return this.http.put<Appointment>('http://localhost:3000/events/'+id,appointmant)
  }
}
