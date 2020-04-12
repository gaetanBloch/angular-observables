import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  userActivatedSubscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userActivatedSubscription = this.userService.activatedSubject.subscribe(
      (activated: boolean) => this.userActivated = activated
    );
  }

  ngOnDestroy(): void {
    this.userActivatedSubscription.unsubscribe();
  }
}
