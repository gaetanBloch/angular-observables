import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Observer, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 5) {
            // Never called because 5 is never reached because of the error
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error('Count is greater than 3!'));
          }
          count++;
        }, 1000);
      }
    );

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((count: number) => count > 0),
        map((count: number) => 'Round : ' + (count + 1))
      )
      .subscribe(
        (count: string) => console.log(count),
        (error: Error) => {
          console.log(error);
          alert(error.message);
        },
        () => console.log('Completed!')
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
