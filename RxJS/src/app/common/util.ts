import { Observable, map } from "rxjs";


export function httpGet<T>(url: string): Observable<T> {

  return new Observable<T>(observer => {
    let controller = new AbortController();
    let signal = controller.signal;

    fetch(url, { signal: signal })
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });

    return () => {
      controller.abort();
    }
  });
}
