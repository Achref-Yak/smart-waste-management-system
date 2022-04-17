import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { User } from '../../interfaces/user.interface';
import { Job } from '../../interfaces/job.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  userSub!: Subscription;
  jobList$: Observable<Job[]> | undefined;

  constructor(private userService: UserService,
              private jobService: JobService) { }

  ngOnInit(): void {
   
    this.getMe();
  }


  getMe() {
    this.userService.getMe().subscribe((res) => {
      console.log(res.data);
      this.user = res.data.data;
    });
  }

 
}
