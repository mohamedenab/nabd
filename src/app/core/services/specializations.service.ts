import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Specialization} from "../interfaces/specialization";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {
  baseUrl = environment.specialization

  constructor(private http: HttpClient) {
  }

  getSpecializations(): Observable<Specialization[]> {
    return this.http.get(`${this.baseUrl}`).pipe(map((res: any) => {
      return res.data
    }))
  }
  deactivateMedicineSpecializations(id: string, patientId: string){
        return this.http.put(`${this.baseUrl}/${id}/patient/${patientId}/deactivate`, {})

  }
  activateMedicineSpecializations(id: string, patientId: string){
        return this.http.put(`${this.baseUrl}/${id}/patient/${patientId}/activate`, {})

  }
}
