import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../interfaces/activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activityList: Activity[] = [];
  constructor(private activities: ActivitiesService) { }

  ngOnInit() {
    this.activities.getData().subscribe(response => this.activityList = response);
  }
}
