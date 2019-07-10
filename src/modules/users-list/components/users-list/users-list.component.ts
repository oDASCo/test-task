import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../../../interfaces';
import {ApiService} from '../../../core/services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public displayedColumns = ['first_name', 'last_name', 'email'];
  public userList: any[] = [];
  public pagesCount: number;
  private page: number;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.getUsers();
    this.activatedRoute.data.pipe(
      map(data => data.paginationInfo)
    )
      .subscribe(paginationInfo => {
        this.pagesCount = paginationInfo.total;
      });
  }

  private getUsers() {
    this.route
      .queryParams
      .subscribe(params => {
        this.page = params.page || 0;
        this.apiService.fetchUsers(this.page).subscribe((data) => {
          this.userList = data.data;
        });
      });
  }

  public pageChanged(event: PageEvent): void {
    const page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  public userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }
}
