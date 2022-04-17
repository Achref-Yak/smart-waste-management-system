import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { trashsData } from '../constants/trashs-static-data';
import { AWSTRASH } from '../interfaces/awstrash.interface';
import { Trash } from '../models/Trash';

@Injectable({
  providedIn: 'root'
})

export class TrashService {

  trashs$: BehaviorSubject<Trash[]>;
  trashs: Array<Trash> = [];

  constructor(private http: HttpClient) {
    this.trashs$ = new BehaviorSubject<Trash[]>([]);
    this.trashs = trashsData;
  }
  
  getAwsTrash(){
    return this.http.get<AWSTRASH[]>(`${environment.awsgettrash}`);
  }

  getAll() {
    this.trashs$.next(this.trashs);
  }

  add(trashs: Trash) {
    this.trashs.push(trashs);
  }

  edit(trash: Trash) {
    let findElem = this.trashs.find(p => p.id == trash.id) ;
    findElem!.city = trash.city;
    findElem!.lat = trash.lat;
    findElem!.lon = trash.lon;
    this.trashs$!.next(this.trashs);
  }

  remove(id: number) {
   
    this.trashs = this.trashs.filter(p => {
      return p.id != id
    });

    this.trashs$.next(this.trashs);
  }
}