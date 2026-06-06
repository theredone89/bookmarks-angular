import { Component, inject } from '@angular/core';
import { Search } from '../../../features/bookmarks/components/search/search';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookmarkApi } from '../../../features/bookmarks/services/bookmark-api.service';
import { BookmarkActions, BookmarkApiActions } from '../../../features/bookmarks/state/bookmark.action';

@Component({
  selector: 'app-header',
  imports: [Search, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.scss',
})
export class HeaderNav {
  private readonly store = inject(Store);
  private readonly bookmarksService = inject(BookmarkApi);

  protected onSearch(query: string): void {
    this.bookmarksService.getBookmarks().subscribe((bookmarks) => {
      this.store.dispatch(BookmarkApiActions.retrievedBookmarkList({ bookmarks }));
      this.store.dispatch(BookmarkActions.searchBookmarks({ query }));
    });
  }
}

