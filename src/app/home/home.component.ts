import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    // Observable that triggers every seconds
    // this.firstObsSubscription = interval(1000).subscribe(
    //   (count: number) => console.log(count)
    // );

    // Custom Observable that triggers every seconds
    const customIntervalObservable = new Observable(
      (observer: Observer<number>) => {
        let count = 1;
        setInterval(() => observer.next(count++), 1000);
      }
    );
    this.firstObsSubscription = customIntervalObservable.subscribe(
      (count: number) => console.log(count)
    );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
