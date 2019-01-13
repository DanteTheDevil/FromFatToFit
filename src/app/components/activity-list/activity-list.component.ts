import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activities } from '../../interfaces/activities';
import { Subscription, fromEvent } from 'rxjs';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})

export class ActivityListComponent implements OnInit, OnDestroy, AfterViewInit {
  private activityList: Activities[] = [];
  public visibleList: Activities[] = [];
  public pages: number[];
  private subscription: Subscription = new Subscription();
  public activitySearch: FormGroup;
  public filteredData: any[];
  private autoCompleteVisibility: boolean;
  private searchFieldSubscr: Subscription;

  @ViewChild('searchField') searchField: ElementRef<HTMLInputElement>;
  @ViewChild('activityList') activityListMainContainer: ElementRef<HTMLDivElement>;
  @ViewChild('autoComplete') autoComplete: ElementRef<HTMLUListElement>;

  constructor(private activitiesService: ActivitiesService, private formBuilder: FormBuilder, private router: Router) {
  }

  static getActivityNameFromElement(element: HTMLElement): string {
    return element.tagName === 'SPAN' ? element.textContent : element.getAttribute('activity-name');
  }

  static isClickEventFiredFromAutoCompleteContainer(element: HTMLElement): boolean {
    return element.classList.contains('autoComplete') ||
      element.classList.contains('auto-complete-list') ||
      element.classList.contains('searchOption');
  }

  ngAfterViewInit(): void {
    const searchFieldBlurEvent$ = fromEvent(this.searchField.nativeElement, 'blur');
    const activityListMouseMoveEvent$ = fromEvent(this.activityListMainContainer.nativeElement, 'mousemove');

    this.searchFieldSubscr = searchFieldBlurEvent$
      .pipe(
        withLatestFrom(activityListMouseMoveEvent$),
        tap((events) => {
          const activityListMouseMoveEvent: MouseEvent = <MouseEvent>events[1];

          const clickedElem: HTMLElement = <HTMLElement>document.elementFromPoint(
            activityListMouseMoveEvent.clientX,
            activityListMouseMoveEvent.clientY
          );

          if (ActivityListComponent.isClickEventFiredFromAutoCompleteContainer(clickedElem) && !this.autoComplete.nativeElement.hidden) {
            const activityName = ActivityListComponent.getActivityNameFromElement(clickedElem);

            this.pickFilteredValue(activityName);
          }
        })
      )
      .subscribe(() => {
        this.setAutoCompleteVisibility(false);
      });
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
  }

  ngOnDestroy(): void {
    this.searchFieldSubscr.unsubscribe();
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
