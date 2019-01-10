import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ActivitiesService} from '../../services/activities/activities.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesGuard implements CanActivate {
  constructor(private activitiesService: ActivitiesService, public router: Router) {}
  canActivate (): boolean {
    const {value} = this.activitiesService.getData();

    if (!value[0].name) {
        this.router.navigate(['/activities']);
        return false;
      }
      return true;
    }
}
