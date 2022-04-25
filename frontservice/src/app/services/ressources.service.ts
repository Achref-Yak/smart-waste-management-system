import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {

  constructor(private http : HttpClient) { }


  getAdress(lat, lon){
    return this.http.get<any>("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyBpc-W4SSnb8kM3cNDK9MYNCucHZdS7Els");
  }

  postProduct(data : any){
    return this.http.post<any>("http://localhost:3000/productList/",data);
  }
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }
  putProduct(data:any,id : any){
    return this.http.put<any>("http://localhost:3000/productList/"+id, data);

  }
  deleteProduct(id:any){
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }




  postTruck(data : any){
    return this.http.post<any>("http://localhost:3000/truckList/",data);
  }
  getTruck(){
    return this.http.get<any>("http://localhost:3000/truckList/");
  }
  putTruck(data:any, id : any){
    return this.http.put<any>("http://localhost:3000/truckList/"+id, data);

  }
  deleteTruck(id:number){
    return this.http.delete<any>("http://localhost:3000/truckList/"+id);
  }






  postTrush(data : any){
    return this.http.post<any>("http://localhost:3000/trashList/",data);
  }
  getTrush(){
    return this.http.get<any>("http://localhost:3000/trashList/");
  }
  putTrush(data:any, id : any){
    return this.http.put<any>("http://localhost:3000/trashList/"+id, data);

  }
  deleteTrush(id:number){
    return this.http.delete<any>("http://localhost:3000/trashList/"+id);
  }


  postClient(data : any){
    return this.http.post<any>("http://localhost:3000/ClientList/",data);
  }
  getClient(){
    return this.http.get<any>("http://localhost:3000/ClientList/");
  }
  putClient(data:any, id : number){
    return this.http.put<any>("http://localhost:3000/ClientList/"+id, data);

  }
  deleteClient(id:number){
    return this.http.delete<any>("http://localhost:3000/ClientList/"+id);
  }



  postReport(data : any){
    return this.http.post<any>("http://localhost:3000/ReportList/",data);
  }
  getReport(){
    return this.http.get<any>("http://localhost:3000/ReportList/");
  }
  putReport(data:any, id : number){
    return this.http.put<any>("http://localhost:3000/ReportList/"+id, data);

  }
  deleteReport(id:number){
    return this.http.delete<any>("http://localhost:3000/ReportList/"+id);
  }


}

