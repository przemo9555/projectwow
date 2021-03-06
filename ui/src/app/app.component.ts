import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGlobalLoaderLoading } from 'src/app/store/selectors/global-loader.selector';
import { GlobalLoaderState } from 'src/app/store/state/global-loader.state';
import { BaseComponent } from 'src/app/utils/base-component';

@Component({
  selector: 'pw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent implements OnInit {

  @HostBinding('class.pw-center') classCenter = true;

  loader: boolean;

  constructor(private globalLoaderStore: Store<GlobalLoaderState>,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.globalLoaderStore.select(getGlobalLoaderLoading)
      .pipe(this.takeUntilDestroy())
      .subscribe(
        loading => {
          this.loader = loading;
          this.changeDetectorRef.detectChanges();
        });
  }


}
