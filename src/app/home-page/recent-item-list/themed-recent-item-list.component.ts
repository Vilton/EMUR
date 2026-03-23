import { Component } from '@angular/core';

import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { RecentItemListComponent } from './recent-item-list.component';

@Component({
  selector: 'ds-recent-item-list',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
  standalone: true,
  imports: [RecentItemListComponent],
})

/**
 * Component to render the news section on the home page
 */
export class ThemedRecentItemListComponent extends ThemedComponent<RecentItemListComponent> {
  protected getComponentName(): string {
    return 'RecentItemListComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/home-page/recent-item-list/recent-item-list.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./recent-item-list.component`);
  }

}
