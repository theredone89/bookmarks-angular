import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookmarkList } from '../../components/bookmark-list/bookmark-list';
import { BookmarkApiActions, BookmarkActions } from '../../state/bookmark.action';
import { selectBookmarks } from '../../state/bookmark.selector';
import { BookmarkApi } from '../../services/bookmark-api.service';

@Component({
  selector: 'app-home',
  imports: [BookmarkList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly bookmarksService = inject(BookmarkApi);
  private readonly store = inject(Store);
  protected bookmarks = this.store.selectSignal(selectBookmarks);

  ngOnInit() {
    this.bookmarksService
      .getBookmarks()
      .subscribe((bookmarks) =>
        this.store.dispatch(BookmarkApiActions.retrievedBookmarkList({ bookmarks }))
      );

    this.store.dispatch(BookmarkActions.searchBookmarks({ query: '' }));
  }
}
