import {
  AsyncPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, PRIMARY_OUTLET, Router, RouterOutlet } from '@angular/router';
import { distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

import { ThemedAdminSidebarComponent } from '../../../../app/admin/admin-sidebar/themed-admin-sidebar.component';
import { ThemedBreadcrumbsComponent } from '../../../../app/breadcrumbs/themed-breadcrumbs.component';
import { ThemedFooterComponent } from '../../../../app/footer/themed-footer.component';
import { ThemedHeaderNavbarWrapperComponent } from '../../../../app/header-nav-wrapper/themed-header-navbar-wrapper.component';
import { ThemedHomeNewsComponent } from '../../../../app/home-page/home-news/themed-home-news.component';
import { RootComponent as BaseComponent } from '../../../../app/root/root.component';
import { slideSidebarPadding } from '../../../../app/shared/animations/slide';
import { LiveRegionComponent } from '../../../../app/shared/live-region/live-region.component';
import { ThemedLoadingComponent } from '../../../../app/shared/loading/themed-loading.component';
import { NotificationsBoardComponent } from '../../../../app/shared/notifications/notifications-board/notifications-board.component';
import { SystemWideAlertBannerComponent } from '../../../../app/system-wide-alert/alert-banner/system-wide-alert-banner.component';

@Component({
  selector: 'ds-themed-root',
  styleUrls: ['./root.component.scss'],
  templateUrl: './root.component.html',
  animations: [slideSidebarPadding],
  standalone: true,
  imports: [
    TranslateModule,
    ThemedAdminSidebarComponent,
    SystemWideAlertBannerComponent,
    ThemedHeaderNavbarWrapperComponent,
    ThemedHomeNewsComponent,
    ThemedBreadcrumbsComponent,
    NgIf,
    NgClass,
    ThemedLoadingComponent,
    RouterOutlet,
    ThemedFooterComponent,
    NotificationsBoardComponent,
    AsyncPipe,
    LiveRegionComponent,
  ],
})
export class RootComponent extends BaseComponent {
  private readonly layoutRouter = inject(Router);

  // NavigationEnd updates the layout after redirects and ignores query parameters.
  // NavigationStart hides the carousel as soon as we leave home, so it is not shown
  // again while the router scrolls to the top before the next page renders.
  readonly isHomePage$ = this.layoutRouter.events.pipe(
    filter((event) => event instanceof NavigationEnd
      || (event instanceof NavigationStart && !this.isHomeUrl(event.url))),
    startWith(null),
    map((event) => event instanceof NavigationStart ? false : this.isHomeUrl(this.layoutRouter.url)),
    distinctUntilChanged(),
  );

  private isHomeUrl(rawUrl: string): boolean {
    const url = this.layoutRouter.parseUrl(rawUrl);
    const segments = url.root.children[PRIMARY_OUTLET]?.segments ?? [];
    return segments.length === 1 && segments[0].path === 'home';
  }
}
