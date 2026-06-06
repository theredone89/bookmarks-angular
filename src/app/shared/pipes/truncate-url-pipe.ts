import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateUrl',
})
export class TruncateUrlPipe implements PipeTransform {
  transform(value: unknown, maxLength = 45): unknown {
    if (value === null || value === undefined) return value;
    const str = String(value);

    // Preserve full origin (protocol + host + port). Keep last path segment
    // entirely if <= 10 chars, otherwise keep last 10 chars of that segment.
    const ellipsis = '...';

    let origin = '';
    let lastSegment = '';
    let search = '';
    let hash = '';
    try {
      let url: URL;
      try {
        url = new URL(str);
      } catch {
        // If missing protocol, assume http
        url = new URL('https://' + str);
      }
      origin = url.origin;
      search = url.search || '';
      hash = url.hash || '';
      const segments = url.pathname.split('/').filter(Boolean);
      if (segments.length === 0) {
        // no path, return origin plus search/hash
        return origin + (search || '') + (hash || '');
      }
      lastSegment = segments[segments.length - 1];
      const retain = lastSegment.length <= 10 ? lastSegment : lastSegment.slice(-10);

      if (segments.length === 1) {
        return origin + '/' + retain + search + hash;
      }

      // multiple segments: show ellipsis for middle path
      return origin + '/' + ellipsis + '/' + retain + search + hash;
    } catch {
      // Fallback for non-URL strings: attempt simple extraction
      const m = str.match(/^([^\/]+)(\/([^#?]*))?([?][^#]*)?(#.*)?$/);
      if (!m) {
        // last resort: truncate to maxLength keeping end
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
      }
      origin = m[1];
      const path = m[3] || '';
      search = m[4] || '';
      hash = m[5] || '';
      const segments = path.split('/').filter(Boolean);
      if (segments.length === 0) return origin + (search || '') + (hash || '');
      lastSegment = segments[segments.length - 1];
      const retain = lastSegment.length <= 10 ? lastSegment : lastSegment.slice(-10);
      if (segments.length === 1) {
        return origin + '/' + retain + search + hash;
      }
      return origin + '/' + ellipsis + '/' + retain + search + hash;
    }
  }
}
