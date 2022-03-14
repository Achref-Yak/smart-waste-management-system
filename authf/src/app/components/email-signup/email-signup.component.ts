import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.css']
})


export class EmailSignupComponent implements OnInit {
  form: FormGroup;
  user: User = new User();
  loading = false;
  submitted = false;
  signupInValid: boolean = false;
  serverError: String;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.serverError=""
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted=true;
    if(this.form.invalid==false)
     this.userService.signUp(this.user).subscribe((res: any) => {
      this.toastrService.success('Please Login', 'Success', {
        timeOut: 3000,
      })  ;
      window.location.reload();
    }, (err) => {     this.toastrService.error(err.error.message, 'Error', {
      timeOut: 3000,
    }) });




  }
}