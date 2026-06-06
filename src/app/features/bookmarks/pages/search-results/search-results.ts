import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookmarkList } from '../../components/bookmark-list/bookmark-list';
import { BookmarkApiActions, BookmarkActions } from '../../state/bookmark.action';
import { selectBookmarks, selectQuery } from '../../state/bookmark.selector';
import { BookmarkApi } from '../../services/bookmark-api.service';

@Component({
  selector: 'app-search-results',
  imports: [BookmarkList],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss',
})
export class SearchResults implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  private readonly bookmarksService = inject(BookmarkApi);

  protected bookmarks = this.store.selectSignal(selectBookmarks);
  protected query = this.store.selectSignal(selectQuery);

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap.get('q') ?? '';

    this.bookmarksService.getBookmarks().subscribe((bookmarks) => {
      this.store.dispatch(BookmarkApiActions.retrievedBookmarkList({ bookmarks }));
      this.store.dispatch(BookmarkActions.searchBookmarks({ query: q }));
    });
  }
}
