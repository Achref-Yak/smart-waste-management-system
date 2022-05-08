import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { TrashService } from 'src/app/services/trash.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  sensorsData: any = [];
  trash:any =[];
  destinations:any;
  subject = webSocket("wss://21t9ayt5cf.execute-api.us-west-2.amazonaws.com/production");
  constructor(private trashService: TrashService) { }



  
  getAllAWStrash()
  {

    this.trashService.getTrush().subscribe(data => {
      console.log(data);
      this.trash = data;


      let positions:any =[];
      this.trash.forEach((mark: { longitude: string; latitude: string; }) => {
        let str = mark.longitude + "," + mark.latitude + "|";
        positions += str;
  
      })
      this.trashService.getMultipleDestinations(positions!, 35.133606, 10.616638).subscribe(data => {
        console.log(data);
        this.destinations = data;
      })
    });
  }


  ngOnInit() {



this.getAllAWStrash();
 
  }

}
