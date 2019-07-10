import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {PaginationApiService} from './pagination-api.service';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient,
              private paginationApiService: PaginationApiService) {}


  public fetchUsers(page: number): Observable<any> {
    return this.http.get<HttpResponse<any>>(`https://reqres.in/api/users?page=${page}`);
  }

  public fetchPaginationInfo(): Observable<any> {
    return this.paginationApiService.fetchPaginationInfo();
  }

  public fetchUserById(id: number): Observable<any> {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }
}
