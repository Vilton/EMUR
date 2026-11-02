import {
  AsyncPipe,
  NgClass,
  NgComponentOutlet,
  NgFor,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuSection } from '../../../../app/shared/menu/menu-section.model';
import { LinkMenuItemModel } from '../../../../app/shared/menu/menu-item/models/link.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';
import { ThemedUserMenuComponent } from '../../../../app/shared/auth-nav-menu/user-menu/themed-user-menu.component';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-themed-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
  animations: [slideMobileNav],
  standalone: true,
  imports: [RouterLink, NgbDropdownModule, NgClass, NgIf, ThemedUserMenuComponent, NgFor, NgComponentOutlet, AsyncPipe, TranslateModule],
})
export class NavbarComponent extends BaseComponent {
  hasMenuLink(sections: MenuSection[], path: string): boolean {
    return sections.some((section) => this.sectionPath(section) === path);
  }

  menuOrder(section: MenuSection): number {
    const order = ['home', 'community-list', 'statistics', 'contact', 'about'];
    const position = order.indexOf(this.sectionPath(section));
    return position < 0 ? 10 + (section.index ?? 0) : position;
  }

  private sectionPath(section: MenuSection): string {
    const model = section.model as Partial<LinkMenuItemModel>;
    return typeof model.link === 'string' ? model.link.replace(/^\/+|\/+$/g, '') : '';
  }
}
