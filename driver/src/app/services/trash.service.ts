import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AWSTRASH {
  id: string;
  gaz: number;
  distance: number;
}



@Injectable({
  providedIn: 'root'
})
export class TrashService {

constructor(private http: HttpClient) { }


getMultipleDestinations(multiple:any, origin_lat:any, origin_lon:any){
  return this.http.get<any>( "http://localhost:3000/trashList/getdestinations/"+multiple+"/"+origin_lat+"/"+origin_lon);
}


getTrush(){
  return this.http.get<any>("http://localhost:3000/trashList/");
}

}
