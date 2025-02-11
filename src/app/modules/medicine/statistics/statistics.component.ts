import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Statistics, StatisticsResponse } from 'src/app/core/interfaces/medicine';
import { MedicineService } from 'src/app/core/services/medicine.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  medicineService = inject(MedicineService)

  statistics$: Observable<Statistics> = this.medicineService.getStatistics().pipe(map((res => res.data)))
}
