import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalenderServiceService {
public events:{date:string,startTime:string,endTime:string,description:string}[]=[];

  constructor() { }

  addEvent(){
    
  }
}
