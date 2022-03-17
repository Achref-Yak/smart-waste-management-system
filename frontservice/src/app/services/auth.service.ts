import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';


interface LoginResponse {
  token: string;
  refresh_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new Subject();
  private dataSource = new BehaviorSubject<String>("aa");
  data = this.dataSource.asObservable();
  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) { }



  loginGoogle(form)
  {
    return this.http.post<LoginResponse>(`${UtilsService.apiUSER}googleSignup`, form)
      .pipe(
        tap(response => {
         
         
        })
      );
  }
  login(form: {email: string; password: string}): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${UtilsService.apiUSER}auth/email`, form)
      .pipe(
        tap(response => {
        
        
          this.setToken('token', response.token);
          this.setToken('refreshToken', response.refresh_token);
         
        })
      );
  }

  
 

  logout(): void {
 
     
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.router.navigate(['/']);
 

  }



  saveTokens(accessToken: string | null, refreshToken: string | null) 
  {
     
      
    
    this.setToken('token', accessToken!);
    this.setToken('refreshToken', refreshToken!);
 
    
  }

 

  refreshToken(): Observable<{accessToken: string; refreshToken: string}> {
    const refreshToken = this.localStorageService.getItem('refreshToken');

    return this.http.post<{accessToken: string; refreshToken: string}>(
      `${UtilsService.apiUSER}refresh-token`,
      {
        refreshToken
      }).pipe(
        tap(response => {
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
    );
  }

  private setToken(key: string, token: string): void {
    console.log(token);
    this.localStorageService.setItem(key, token);
  }
}
