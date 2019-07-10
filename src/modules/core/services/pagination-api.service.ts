import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PaginationApiService {

  constructor(private http: HttpClient) {}

  public fetchPaginationInfo(): Observable<any> {
    return this.http.get('https://reqres.in/api/users?page=1');
  }
}
