import {AfterViewInit, Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "../../../../core/interfaces/location";
import {LocationService} from "../../../../core/services/location.service";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  router = inject(Router);
  locations: Location[] = []
  public authService: AuthService = inject(AuthService);

  constructor(private locationService: LocationService,) {
  }

  ngAfterViewInit() {
    this.locationService.getLocations(0, 1000).subscribe((res: any) => {
      this.locations = res.data;
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['./login'])
  }
}
