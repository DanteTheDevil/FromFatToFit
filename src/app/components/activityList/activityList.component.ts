import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activities } from '../../interfaces/activities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activityList.component.html',
  styleUrls: ['./activityList.component.scss']
})

export class ActivityListComponent implements OnInit, OnDestroy {
  private activityList: Activities[] = [];
  private visibleList: Activities[] = [];
  private currentPage: number;
  private pages: number[];
  private subscription: Subscription;

  constructor(private activitiesService: ActivitiesService) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.subscription = this.activitiesService.getData().subscribe(response => {
      this.activityList = response;
      this.pages = this.activitiesService.getPagesArr(response);
      this.visibleList = this.activityList.slice(0, 7);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changePage(page): void {
    const firstPageElem = 7 * (page - 1);
    const lastPageElem = 7 + 7 * (page - 1);
    this.visibleList = this.activityList.slice(firstPageElem, lastPageElem);
  }
}
