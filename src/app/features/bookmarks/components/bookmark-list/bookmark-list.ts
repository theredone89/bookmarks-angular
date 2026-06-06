import { Component, Input } from '@angular/core';
import { BookmarkItem } from '../bookmark-item/bookmark-item';
import { IBookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-bookmar-list',
  standalone: true,
  imports: [BookmarkItem],
  templateUrl: './bookmark-list.html',
  styleUrls: ['./bookmark-list.scss'],
})
export class BookmarkList {
  @Input() bookmarks: ReadonlyArray<IBookmark> = [];

  private getDateKey(dateValue: string): string {
    const date = new Date(dateValue);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  protected get todayBookmarks(): ReadonlyArray<IBookmark> {
    const todayKey = this.getDateKey(new Date().toISOString());
    return this.bookmarks.filter((bookmark) => this.getDateKey(bookmark.date) === todayKey);
  }

  protected get yesterdayBookmarks(): ReadonlyArray<IBookmark> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = this.getDateKey(yesterday.toISOString());
    return this.bookmarks.filter((bookmark) => this.getDateKey(bookmark.date) === yesterdayKey);
  }

  protected get olderBookmarks(): ReadonlyArray<IBookmark> {
    const todayKey = this.getDateKey(new Date().toISOString());
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = this.getDateKey(yesterday.toISOString());

    return this.bookmarks.filter((bookmark) => {
      const dateKey = this.getDateKey(bookmark.date);
      return dateKey !== todayKey && dateKey !== yesterdayKey;
    });
  }
}
