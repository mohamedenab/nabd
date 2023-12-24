import {ResolveFn} from '@angular/router';
import {Observable} from "rxjs";
import {LocationService} from "../services/location.service";
import {inject} from "@angular/core";

export const locationsResolver: ResolveFn<Observable<any>> = (route, state, locationService: LocationService = inject(LocationService)
) => {
    return locationService.getLocations(0, 100);
};
export const locationResolver: ResolveFn<Observable<any>> = (route, state, locationService: LocationService = inject(LocationService)
) => {
    return locationService.getLocation(route.paramMap.get('id')!);
};
