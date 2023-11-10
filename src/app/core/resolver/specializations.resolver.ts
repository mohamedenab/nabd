import {ResolveFn} from '@angular/router';
import {SpecializationsService} from "../services/specializations.service";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {Specialization} from "../interfaces/specialization";

export const specializationsResolver: ResolveFn<Observable<Specialization[]>> = (route, state, specializationsService: SpecializationsService = inject(SpecializationsService)) => {
  return specializationsService.getSpecializations();
};
