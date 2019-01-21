import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ActivitiesService} from '../activities.service';

@Injectable({
  providedIn: 'root'
})
export class ItemGuard implements CanActivate {
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
