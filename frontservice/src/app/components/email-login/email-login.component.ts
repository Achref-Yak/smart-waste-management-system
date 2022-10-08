import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMessage: any;
  public dataObsevable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authService.data.subscribe( data => {
      console.log(data);
      
    });
 
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  openDialog() {
    const dialogRef = this.dialog.open(ForgotpasswordemailComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/admin-dashboard');
      }, err => {
        console.log(err);
      });
    }  


  }

    @Component({
      selector: 'forgotpassword-email',
      templateUrl: 'forgotpasswordemail.component.html',
    })
    export class ForgotpasswordemailComponent {
      emaildata = { email: "" };
      form: FormGroup
      constructor(
        private userService: UserService,
        public dialogRef: MatDialogRef<ForgotpasswordemailComponent>,
        private formBuilder: FormBuilder,
        private toastrService: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
          
          this.form = this.formBuilder.group({
      
      
            email: ['', [Validators.required, Validators.email]]
          });
  
        }
    

        onSubmit()
        {
          this.userService.forgotPassword(this.emaildata).subscribe((res: any) => {

            console.log(res);
            this.toastrService.success('We will send you a token to your email if it exists', '', {
              timeOut: 3000,
            })  ;
            this.dialogRef.close();
            

      });
        }
      onNoClick(): void {
        this.dialogRef.close();
      }
    
    }
  
 