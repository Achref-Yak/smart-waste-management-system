import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {
   body = {usr:SocialUser};
  constructor(private router: Router, private authService: AuthService, private socialService: SocialAuthService, private localStorage: LocalStorageService, ) { }

  ngOnInit() {
   
  }
  signInWithGoogle(): void {
    let user;
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      console.log(data);
         
    this.authService.loginGoogle({user: data}).subscribe((res: any) => {
      console.log(res.token);
      this.authService.saveTokens(res.token, res.refresh_token);
      this.router.navigate(['/profile'])
    });
  
      
    })
 

  }
 

 
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  console.log("out");
 
}
}
