import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from "./components/todo/todo.component";
 

export const routes  = [{
  path: '',
  component: TodoComponent,
 // canActivate: [AuthGuardService]
},
 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

