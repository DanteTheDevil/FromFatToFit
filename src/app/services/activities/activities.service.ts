import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { Activities } from '../../interfaces/activities';
import { debounceTime, map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ActivitiesService implements OnInit {
  private activities$ = new BehaviorSubject<Activities[]>([{'name': '', 'calories': 0}]);

  constructor(private http: HttpClient, private afDb: AngularFireDatabase) {
  }

  ngOnInit () {
  }

  filterData (word) {
    return this.afDb.list('activities').valueChanges()
      .pipe(
        debounceTime(500),
        map(response => {
          return response.filter((data: Activities) => data.name.includes(word));
        })
      );
  }

  updateData(activities: Activities[]): void {
    this.activities$.next([...activities]);
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
    return this.activities$;
  }

  getPagesArr (list: Activities[]): number[] {
    const pagesNumber: number = this.getPagesNumber(list);

    return new Array(pagesNumber);
  }
}

