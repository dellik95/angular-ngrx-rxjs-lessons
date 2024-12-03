import { Observable, tap } from 'rxjs';
export enum RxJsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  WARN
};

let defaultLoggingLevel = RxJsLoggingLevel.INFO;

export function setLoggingLevel(level: RxJsLoggingLevel) {
  defaultLoggingLevel = level;
}

export const debug = (level: RxJsLoggingLevel, message: string) =>
  (source: Observable<any>) => {
    return source.pipe(
      tap(values => {
        if (level >= defaultLoggingLevel) {
          console.log(`${level.toString()}: ${message}`, values);
        }
      })
    )
  }
