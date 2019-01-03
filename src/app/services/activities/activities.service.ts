import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private http: HttpClient) { }
  getData(): Observable<Activity[]> {
    return this.http.get('https://from-fat-to-fit.firebaseio.com/activities.json');
  }
}
