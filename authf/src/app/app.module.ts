import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './services/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ForgotpasswordemailComponent, LoginComponent } from './components/email-login/email-login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmailSignupComponent } from './components/email-signup/email-signup.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { LogoutComponent } from './components/logout/logout.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    EmailSignupComponent,
    SocialLoginComponent,
    LogoutComponent,
    ForgotpasswordComponent,
    ForgotpasswordemailComponent,
    AdminDashboardComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    FlexLayoutModule,
    MatDialogModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
 
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true,
    
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '206839759126-4fi5aq1gngv3grhic38u46l7f8kviot6.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  entryComponents: [LoginComponent,ForgotpasswordemailComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
