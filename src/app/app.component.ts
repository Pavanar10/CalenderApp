import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calenderApp';
  selectedDate!: Date;
  appointments:any[] = [];

  onDateSelected(date: any) {
    this.selectedDate = date;
  }
  
}
