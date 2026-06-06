import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IBookmark } from '../models/bookmark.model';


@Injectable({
  providedIn: 'root'
})
export class BookmarkApi {
  private readonly http = inject(HttpClient);
  private readonly bookmarksUrl = `${environment.apiUrl}/bookmarks`;

  getBookmarks(): Observable<IBookmark[]> {
    return this.http
      .get<IBookmark[]>(this.bookmarksUrl)
      .pipe(map((bookmarks) => bookmarks));
  }

  addBookmark(bookmark: IBookmark): Observable<IBookmark> {
    return this.http.post<IBookmark>(this.bookmarksUrl, bookmark);
  }

  updateBookmark(bookmark: IBookmark): Observable<IBookmark> {
    return this.http.put<IBookmark>(`${this.bookmarksUrl}/${bookmark.id}`, bookmark);
  }

  deleteBookmark(id: string): Observable<void> {
    return this.http.delete<void>(`${this.bookmarksUrl}/${id}`);
  }
}
