import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { bookmarkReducer} from './features/bookmarks/state/bookmark.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideHttpClient(),
    provideRouter(routes), 
    provideStore({
      bookmarks: bookmarkReducer
    })
  ],
};
