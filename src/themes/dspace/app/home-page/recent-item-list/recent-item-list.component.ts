import {
  AsyncPipe,
  isPlatformBrowser,
  NgClass,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import {
  SortDirection,
  SortOptions,
} from 'src/app/core/cache/models/sort-options.model';
import { PaginatedList } from 'src/app/core/data/paginated-list.model';
import { RemoteData } from 'src/app/core/data/remote-data';
import { PaginationService } from 'src/app/core/pagination/pagination.service';
import { DSpaceObjectType } from 'src/app/core/shared/dspace-object-type.model';
import { Item } from 'src/app/core/shared/item.model';
import { toDSpaceObjectListRD } from 'src/app/core/shared/operators';
import { SearchService } from 'src/app/core/shared/search/search.service';
import { SearchConfigurationService } from 'src/app/core/shared/search/search-configuration.service';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';
import {
  fadeIn,
  fadeInOut,
} from 'src/app/shared/animations/fade';
import { ErrorComponent } from 'src/app/shared/error/error.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { PaginationComponentOptions } from 'src/app/shared/pagination/pagination-component-options.model';
import { PaginatedSearchOptions } from 'src/app/shared/search/models/paginated-search-options.model';
import { setPlaceHolderAttributes } from 'src/app/shared/utils/object-list-utils';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ds-recent-item-list',
  templateUrl: './recent-item-list.component.html',
  styleUrls: ['./recent-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeIn,
    fadeInOut,
  ],
  standalone: true,
  imports: [VarDirective, NgIf, NgClass, NgFor, RouterLink, ErrorComponent, ThemedLoadingComponent, AsyncPipe, TranslateModule],
})
export class RecentItemListComponent implements OnInit, OnDestroy {
  itemRD$: Observable<RemoteData<PaginatedList<Item>>>;
  paginationConfig: PaginationComponentOptions;
  sortConfig: SortOptions;

  private _placeholderFontClass: string;

  constructor(
    private searchService: SearchService,
    private paginationService: PaginationService,
    public searchConfigurationService: SearchConfigurationService,
    protected elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {
    this.paginationConfig = Object.assign(new PaginationComponentOptions(), {
      id: 'hp',
      pageSize: environment.homePage.recentSubmissions.pageSize,
      currentPage: 1,
      maxSize: 1,
    });
    this.sortConfig = new SortOptions(environment.homePage.recentSubmissions.sortField, SortDirection.DESC);
  }

  ngOnInit(): void {
    // Os cards não exibem miniatura nem status de acesso,
    // então não é preciso seguir esses links (menos requisições à API).
    this.itemRD$ = this.searchService.search(
      new PaginatedSearchOptions({
        pagination: this.paginationConfig,
        dsoTypes: [DSpaceObjectType.ITEM],
        sort: this.sortConfig,
      }),
    ).pipe(
      toDSpaceObjectListRD(),
    ) as Observable<RemoteData<PaginatedList<Item>>>;
  }

  ngOnDestroy(): void {
    this.paginationService.clearPagination(this.paginationConfig.id);
  }

  onLoadMore(): void {
    this.paginationService.updateRouteWithUrl(this.searchConfigurationService.paginationID, ['search'], {
      sortField: environment.homePage.recentSubmissions.sortField,
      sortDirection: 'DESC' as SortDirection,
      page: 1,
    });
  }

  /** Rota da página do item */
  itemRoute(item: Item): string {
    return getItemPageRoute(item);
  }

  /** Título do item */
  itemTitle(item: Item): string {
    return item.firstMetadataValue('dc.title');
  }

  /** Data de publicação (dc.date.issued) */
  itemDate(item: Item): string {
    return item.firstMetadataValue('dc.date.issued');
  }

  /** Resumo: usa dc.description.abstract e, se não houver, dc.description */
  itemAbstract(item: Item): string {
    return item.firstMetadataValue(['dc.description.abstract', 'dc.description']);
  }

  trackById(_index: number, item: Item): string {
    return item.id;
  }

  get placeholderFontClass(): string {
    if (this._placeholderFontClass === undefined) {
      if (isPlatformBrowser(this.platformId)) {
        const width = this.elementRef.nativeElement.offsetWidth;
        this._placeholderFontClass = setPlaceHolderAttributes(width);
      } else {
        this._placeholderFontClass = 'hide-placeholder-text';
      }
    }
    return this._placeholderFontClass;
  }

}
