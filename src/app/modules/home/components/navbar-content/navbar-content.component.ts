import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {LocationService} from "../../../../core/services/location.service";
import {Location} from "../../../../core/interfaces/location";
import {MatSidenav} from "@angular/material/sidenav";
import {SidenavService} from "../../../../core/services/sidenav.service";

@Component({
    selector: 'app-navbar-content',
    templateUrl: './navbar-content.component.html',
    styleUrls: ['./navbar-content.component.scss']
})
export class NavbarContentComponent implements AfterViewInit {
    router = inject(Router);
    public authService: AuthService = inject(AuthService);
    public sidenav: SidenavService = inject(SidenavService);
    public locationService: LocationService = inject(LocationService);
    locations: Location[] = []
    public innerWidth: any;

    ngAfterViewInit() {
        this.innerWidth = window.innerWidth;
        this.locationService.getLocations(0, 1000).subscribe((res: any) => {
            this.locations = res.data;
        })
    }

    closeSideNav() {
        if (this.innerWidth <= 768) {
            this.sidenav.toggle();
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['./login'])
    }
}
