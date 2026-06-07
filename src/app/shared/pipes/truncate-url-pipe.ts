import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateUrl',
})
export class TruncateUrlPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (value === null || value === undefined) return value;

    const str = String(value);
    const maxLenLastSegment = 20;
    const maxLenOrigin = 30;

    if (str.length < (maxLenOrigin + maxLenLastSegment)) {
      return str;
    }

    const ellipsis = '...';
    const url: URL = new URL(str);
    const origin = url.origin + '/';
    const search = url.search || '';
    const hash = url.hash || '';
    const segments = url.pathname.split('/').filter(Boolean);

    if (segments.length === 0) {
      return str.slice(0, maxLenOrigin + maxLenLastSegment - 3) + ellipsis;
    }

    const lastSegment = '/' + segments[segments.length - 1];
    const retain = lastSegment.length <= maxLenLastSegment ? lastSegment : lastSegment.slice(-maxLenLastSegment);
    const retainOrigin = origin.length <= maxLenOrigin ? origin : origin.slice(0, maxLenOrigin);

    return retainOrigin + ellipsis + retain + search + hash;
  }
}
