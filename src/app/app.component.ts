import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userActivated = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.activatedEmitter.subscribe(
      (activated: boolean) => this.userActivated = activated
    );
  }
}
