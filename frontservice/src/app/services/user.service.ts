/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myToast: any;

  constructor(private utilsService: UtilsService ) { }
  getMe(): Observable<User> {
    return this.utilsService.get(UtilsService.apiUSER + 'me').pipe(map(res => {
      return res;
    }), catchError(this.handleError));
  }
 

  updateMe(user: any) {
    return this.utilsService.patch(UtilsService.apiUSER + 'updateMe', user);
  }
  updateCoverMe(user: any) {
    return this.utilsService.patch(UtilsService.apiUSER + 'cover', user);
  }

  updateUser(user: any) {
    return this.utilsService.patch(UtilsService.apiUSER, user);
  }
  getUser(id: string): Observable<User> {
    return this.utilsService.get(UtilsService.apiUSER + id).pipe(map(res => {
      return res;
    }), catchError(this.handleError));
  }
  signUp(user: User): Observable<User> {
    console.log(user);
    
    return this.utilsService.post(UtilsService.apiUSER + 'signup', user)
  }
  confirmInscription(code: any): Observable<any> {
    return this.utilsService.post(UtilsService.apiUSER + 'confirm', code).pipe(map(res => res), catchError(this.handleError));
  }
  forgotPassword(user) {
    return this.utilsService.post(UtilsService.apiUSER + 'forgotPassword', user).pipe(map(res => res), catchError(this.handleError));
  }
  resetPassword(data, token: any): Observable<User> {
    return this.utilsService.patch(UtilsService.apiUSER + 'resetPassword/' + token, data).pipe(map(res => res), catchError(this.handleError));
  }
  renvoyerToken(user: User): Observable<User> {
    return this.utilsService.post(UtilsService.apiUSER + 'renvoi', user).pipe(map(res => res), catchError(this.handleError));
  }
  deactivate(user: any): Observable<any> {
    return this.utilsService.post(UtilsService.apideactivation,user).pipe(map(res => {
      
      return res;

    }), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    
    if (error?.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error?.error?.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if (error?.status === 500) {  }
      console.error(`Backend returned code ${error?.status}, ` + `body was: ${error?.error?.message}`);
     
    }
    // return an observable with a user-facing error message

    return throwError(error?.error?.message);
  }
 



  getAllusers() {
    return this.utilsService.get(`${UtilsService.apiUSER}`).pipe(map((res) => res.data.data));

  }
  getUsersKids(): Observable<any> {

    return this.utilsService.get(`${UtilsService.apiUSER}?role=kids`).pipe(map(res => res.data.data));
  }

  getRoleUsers(): Observable<any> {

    return this.utilsService.get(`${UtilsService.apiUSER}?role=user`).pipe(map(res => res.data.data

    ));
  }

}