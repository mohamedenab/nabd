import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DeleteWarningComponent} from "../../../shared/components/delete-warning/delete-warning.component";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {LocationService} from "../../../core/services/location.service";
import {Patient} from "../../../core/interfaces/patient";

const MEDICINE =
  `
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m678-134 46-46-64-64-46 46q-14 14-14 32t14 32q14 14 32 14t32-14Zm102-102 46-46q14-14 14-32t-14-32q-14-14-32-14t-32 14l-46 46 64 64ZM735-77q-37 37-89 37t-89-37q-37-37-37-89t37-89l148-148q37-37 89-37t89 37q37 37 37 89t-37 89L735-77ZM200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v245q-20-5-40-5t-40 3v-243H200v560h243q-3 20-3 40t5 40H200Zm280-670q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM280-600v-80h400v80H280Zm0 160v-80h400v34q-8 5-15.5 11.5T649-460l-20 20H280Zm0 160v-80h269l-49 49q-8 8-14.5 15.5T474-280H280Z"/></svg>
`;

@Component({
  selector: 'app-locations',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'phone', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  regionName = ''
  isLoading = true;
  totalElements = 10;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('addRegionTemp') addRegionTemp!: TemplateRef<any>;
  public readonly route: ActivatedRoute = inject(ActivatedRoute);
  private locationService: LocationService = inject(LocationService);

  constructor(private dialog: MatDialog, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('medicine', sanitizer.bypassSecurityTrustHtml(MEDICINE));

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.locationService.getPatient(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.route.snapshot.paramMap.get('id')!
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

  deletePatient(patient: Patient) {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {
        message:
          `هل انت متاكد انك تريد حذف ${patient.name} `
      }
    })
    dialogRef.afterClosed().subscribe((res) => {

    })
  }

  disablePatient(patient: Patient) {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {message: 'هل انت متاكد انك تريد تعطيل الحالة 1 ؟'}
    })
    dialogRef.afterClosed().subscribe((res) => {

    })
  }
}
