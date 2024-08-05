import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './component/calender/calender.component';

const routes: Routes = [
  {path:'calender',component:CalenderComponent},
  {path:'',redirectTo:'calender',pathMatch:'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
