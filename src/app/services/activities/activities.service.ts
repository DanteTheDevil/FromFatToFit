import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { Activities } from '../../interfaces/activities';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ActivitiesService implements OnInit {
  private activities = new BehaviorSubject<Activities[]>([{'name': '', 'calories': 0}]);

  constructor(private http: HttpClient) {
  }

  ngOnInit () {
    console.log(this.activities);
  }

  updateData(activities: Activities[]) {
    this.activities.next([...activities]);
  }

  fetchData(): Observable<Activities[]> {
    return this.http.get<Activities[]>('https://from-fat-to-fit.firebaseio.com/activities.json')
      .pipe(
        map(data => {
          data.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
          });
          return data;
        })
      );
  }

  getPagesNumber(list: Activities[]): number {
    return Math.floor(list.length / 7);
  }

  getData(): BehaviorSubject<Activities[]> {
    return this.activities;
  }

  getPagesArr (list: Activities[]): number[] {
    const pagesNumber: number = this.getPagesNumber(list);

    return new Array(pagesNumber);
  }
}

