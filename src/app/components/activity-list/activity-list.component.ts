import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activities } from '../../interfaces/activities';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})

export class ActivityListComponent implements OnInit, OnDestroy {
  private activityList: Activities[] = [];
  private visibleList: Activities[] = [];
  private pages: number[];
  private subscription: Subscription = new Subscription();
  private activitySearch: FormGroup;
  private filteredData: any[];
  private autoCompleteVisibility: boolean;

  constructor(private activitiesService: ActivitiesService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription.add(this.activitiesService.getData().subscribe(response => {
      this.activityList = response;
      this.pages = this.activitiesService.getPagesArr(response);
      this.visibleList = this.activityList.slice(0, 7);
    }));

    this.activitySearch = this.formBuilder.group({
      searchInput: ''
    });

    this.filteredData = [];
    this.setAutoCompleteVisibility(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterData(value) {
    this.activitiesService.filterData(value).subscribe(response => {
      this.setAutoCompleteVisibility(true);
      if (response.length > 5) {
        return this.filteredData = response.slice(0, 5);
      }
      this.filteredData = response;
    });
  }

  setAutoCompleteVisibility(value): void {
    this.autoCompleteVisibility = value;
  }
  pickFilteredValue (value): void {
    console.log(value);
    this.activitySearch.setValue({searchInput: value});
    this.setAutoCompleteVisibility(false);
  }

  changePage(page): void {
    const firstPageElem = 7 * (page - 1);
    const lastPageElem = 7 + 7 * (page - 1);
    this.visibleList = this.activityList.slice(firstPageElem, lastPageElem);
  }

  pickActivity (value): void {
    for (const item of this.activityList) {
      if (item.name === value) {
        this.router.navigate([`activities/${value}`]);
      }
    }
  }
}
