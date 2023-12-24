import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {MedicineService} from "../services/medicine.service";

export const medicineResolver: ResolveFn<boolean> = (route, state, medicineService: MedicineService = inject(MedicineService)) => {
    return medicineService.getMedicine(route.paramMap.get('id')!);
};
