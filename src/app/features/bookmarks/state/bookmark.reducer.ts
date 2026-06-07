import { createReducer, on } from '@ngrx/store';
import { IBookmark } from '../models/bookmark.model';
import { BookmarkActions, BookmarkApiActions } from './bookmark.action';

export interface BookmarkState {
  bookmarks: ReadonlyArray<IBookmark>;
  query: string;
}

export const initialState: BookmarkState = {
  bookmarks: [],
  query: '',
};

export const bookmarkReducer = createReducer(
  initialState,
  on(BookmarkApiActions.retrievedBookmarkList, (state, { bookmarks }) => ({
    ...state,
    bookmarks,
  })),
  on(BookmarkActions.addBookmark, (state, { bookmark }) => ({
    ...state,
    bookmarks: [...state.bookmarks, bookmark],
  })),
  on(BookmarkActions.editBookmark, (state, { bookmark }) => ({
    ...state,
    bookmarks: state.bookmarks.map((existingBookmark) =>
      existingBookmark.id === bookmark.id ? bookmark : existingBookmark
    ),
  })),
  on(BookmarkActions.removeBookmark, (state, { id }) => ({
    ...state,
    bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
  })),
  on(BookmarkActions.searchBookmarks, (state, { query }) => ({
    ...state,
    query,
  }))
);
