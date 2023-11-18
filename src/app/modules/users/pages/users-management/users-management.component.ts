import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../../core/services/users.service";
import {DeleteWarningComponent} from "../../../../shared/components/delete-warning/delete-warning.component";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../../../core/interfaces/users";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html'
})
export class UsersManagementComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 10;
  isLoading = true;
  private userService: UsersService = inject(UsersService);
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);

  constructor(private dialog: MatDialog, private toast: HotToastService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.userService.getUsers(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          if (data == null) return [];
          this.totalElements = data.totalElements;
          this.isLoading = false;
          return data.data;
        })
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  editUser(user: User) {
    this.router.navigate(['../edit/' + user.id], {state: {user: user}, relativeTo: this.activeRouter})
  }

  deleteUser(user: User) {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {message: `هل انت متاكد انك تريد حذف المستخدم ${user.name} ؟ `}
    })
    dialogRef.afterClosed().subscribe((res) => {
      this.toast.success('تم حذف المستخدم', {duration: 5000, position: "top-right", theme: "snackbar"});
    })
  }
}
