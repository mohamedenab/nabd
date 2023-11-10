import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.patient

  constructor(private http: HttpClient) {
  }

  createPatient(data: any) {
    return this.http.post(`${this.baseUrl}`, data)
  }

  getPatient(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`,)
  }

  getMedicine(id: string) {
    return this.http.get(`${this.baseUrl}/${id}/medicine`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }

  getHistory(id: string, year: number, month: number) {
    return this.http.get(`${this.baseUrl}/${id}/history?year=${year}&month=${month}`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }

  addMedicine(id: string, medicineId: string, data: any) {
    return this.http.post(`${this.baseUrl}/${id}/medicine/${medicineId}`, data)
  }

  getAllMedicine(id: string) {
    return this.http.get(`${this.baseUrl}/${id}/medicine/all`)
  }
}
