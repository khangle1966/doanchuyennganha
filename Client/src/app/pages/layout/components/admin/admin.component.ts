import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiPreviewDialogService } from '@taiga-ui/addon-preview';
import { tuiIsPresent } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
} from '@taiga-ui/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  of,
  startWith,
  switchMap,
  timer,
} from 'rxjs';
import { Course } from 'src/app/models/Course.model';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less'],
})
export class AdminComponent implements OnInit {
  @ViewChild('preview')
  readonly preview?: TemplateRef<TuiDialogContext>;

  readonly searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  checkboxList = new FormControl('Check');
  courseList: Course[] = [
    {
      _id: '1',
      name: 'Angular',
      category: 'Frontend Developer',
      description:
        'Angular is a platform for building mobile and desktop web applications.Angular is a platform for building mobile and desktop web applications.Angular is a platform for building mobile and desktop web applications.Angular is a platform for building mobile and desktop web applications.Angular is a platform for building mobile and desktop web applications.Angular is a platform for building mobile and desktop web applications.Angular is a platform for building mobile and desktop web applications.',
      price: 100,
      author: 'Google',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      img: 'https://angular.io/assets/images/logos/angular/angular.svg',
      rating: 4.5,
      language: 'English',
    },
    {
      _id: '2',
      name: 'React',
      category: 'Frontend Developer',
      description: 'A JavaScript library for building user interfaces',
      price: 100,
      author: 'Facebook',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
      rating: 4.5,
      language: 'English',
    },
    {
      _id: '3',
      name: 'Vue',
      category: 'Frontend Developer',
      description: 'The Progressive JavaScript Framework',
      price: 100,
      author: 'Evan You',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      img: 'https://vuejs.org/images/logo.png',
      rating: 4.5,
      language: 'English',
    },
    {
      _id: '4',
      name: 'Svelte',
      category: 'Frontend Developer',
      description: 'Cybernetically enhanced web apps',
      price: 100,
      author: 'Rich Harris',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png',
      rating: 4.5,
      language: 'English',
    },
    {
      _id: '5',
      name: 'Ember',
      category: 'Frontend Developer',
      description: 'A framework for ambitious web developers',
      price: 100,
      author: 'Yehuda Katz',
      date_Created: '2021-07-01',
      date_Updated: '2021-07-01',
      img: 'https://ng-web-apis.github.io/dist/assets/images/web-api.svg',
      rating: 4.5,
      language: 'English',
    },
  ];

  constructor(
    private router: Router,
    @Inject(TuiPreviewDialogService)
    private readonly previewDialogService: TuiPreviewDialogService,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit(): void {}

  selectCourse: Course | null = null;
  selectEditCourse(course: Course) {
    if (this.selectCourse?._id !== course._id) {
      this.selectCourse = <Course>{ ...course };
      console.log('select courrse', this.selectCourse);
    }
  }

  openEdit = false;
  openEditSidebar(open: boolean): void {
    console.log('openEditSidebar: ', open);
    if (open != this.openEdit) {
      this.openEdit = open;
    }
  }
  openCreate = false;
  openCreateSidebar(open: boolean): void {
    if (open != this.openCreate) {
      this.openCreate = open;
    }
  }

  editLessons($event: boolean) {
    this.openEditSidebar($event);
    if (this.selectCourse != null) {
      this.router.navigateByUrl(`/base/admin/course/${this.selectCourse._id}`);
    }
  }

  editQuiz($event: boolean) {
    this.openEditSidebar($event);
    if (this.selectCourse != null) {
      this.router.navigateByUrl(
        `/base/admin/course/${this.selectCourse._id}/quiz`
      );
    }
  }

  //image preview
  images = [
    {
      title: 'some table.xlsx',
      hasPreview: false,
      src: '',
    },
  ];

  readonly index$$ = new BehaviorSubject<number>(0);

  readonly item$ = this.index$$.pipe(
    map((index) => this.images[index]),
    filter(tuiIsPresent)
  );

  readonly title$ = this.item$.pipe(map((item) => item.title));

  readonly contentUnavailable$ = this.item$.pipe(
    map((item) => !item.hasPreview)
  );

  readonly imageSrc$ = this.item$.pipe(
    switchMap((item) =>
      item.hasPreview
        ? this.emulateBackendRequest(item.src).pipe(startWith(''))
        : of(null)
    )
  );

  readonly loading$ = this.imageSrc$.pipe(map((src) => src === ''));

  show(index: number): void {
    this.images = [];
    this.images.push({
      hasPreview: true,
      src: this.courseList[index].img,
      title: this.courseList[index].name,
    });
    this.previewDialogService.open(this.preview || '').subscribe();
  }

  download(): void {
    this.alerts.open('Downloading...').subscribe();
  }

  emulateBackendRequest(src: string): Observable<string> {
    return timer(1500).pipe(map(() => src));
  }

  //create func
  createCourse(course: Course) {
    this.openCreate = false;
    this.courseList.push(course);
    this.alerts
      .open('Create new course success !!!', { status: 'success' })
      .subscribe();
  }

  //delete func
  showWarningDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
  }

  deleteCourse() {
    this.courseList = this.courseList.filter(
      (val) => val._id != this.selectCourse?._id
    );
    this.selectCourse = null;
    this.checkboxList.setValue('Check');
  }

  //update func
  updateCourse($event: Course) {
    // console.log($event);
    this.openEdit = false;
    this.courseList = this.courseList.map((val) => {
      if (val._id == $event._id) {
        console.log('match');
        this.selectCourse = $event;
        return $event;
      } else {
        return val;
      }
    });
    console.log(this.courseList);
    this.alerts
      .open('Update course success !!!', { status: 'success' })
      .subscribe();
  }
}
