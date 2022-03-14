import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgotPassword } from 'src/app/models/ForgotPassword';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  form: FormGroup;
  token: String;
  data: ForgotPassword = new ForgotPassword()
  loading = false;
  submitted = false;
  signupInValid: boolean = false;
  serverError: String;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    
  ) {
    this.form = this.formBuilder.group({
      
      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    });

   }
   get f() { return this.form.controls; }
  ngOnInit() {
  }

  onSubmit()
  {
    this.userService.resetPassword(this.data, this.token).subscribe((res: any) => {
          console.log(res);
          this.toastrService.success('Password changed', 'Success', {
            timeOut: 3000,
          })  ;
          this.router.navigate(  ["/"]);
    });
  }
}
