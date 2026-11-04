import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../app/core/auth/auth.service';
import { SearchService } from '../../../../app/core/shared/search/search.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ThemedLangSwitchComponent } from 'src/app/shared/lang-switch/themed-lang-switch.component';

import { ContextHelpToggleComponent } from '../../../../app/header/context-help-toggle/context-help-toggle.component';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import { ThemedNavbarComponent } from '../../../../app/navbar/themed-navbar.component';
import { ThemedAuthNavMenuComponent } from '../../../../app/shared/auth-nav-menu/themed-auth-nav-menu.component';
import { ImpersonateNavbarComponent } from '../../../../app/shared/impersonate-navbar/impersonate-navbar.component';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-themed-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
  standalone: true,
  imports: [NgbDropdownModule, ThemedLangSwitchComponent, RouterLink, ContextHelpToggleComponent, ThemedAuthNavMenuComponent, ImpersonateNavbarComponent, ThemedNavbarComponent, TranslateModule, AsyncPipe, NgIf],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public isNavBarCollapsed$: Observable<boolean>;
  public isAuthenticated$: Observable<boolean> = inject(AuthService).isAuthenticated();
  private readonly navbarRouter = inject(Router);
  private readonly navbarSearchService = inject(SearchService);

  submitNavbarSearch(event: Event, query: string): void {
    event.preventDefault();
    void this.navbarRouter.navigate([this.navbarSearchService.getSearchLink()], {
      queryParams: { query: query.trim() },
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.isNavBarCollapsed$ = this.menuService.isMenuCollapsed(this.menuID);
  }
}
