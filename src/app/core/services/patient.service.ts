import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, pipe} from "rxjs";
import {cache} from "../utlis/cache";
import {StorageService} from "../utlis/storage.service";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.patient
  historyUrl = environment.history

  constructor(private http: HttpClient, private storageService: StorageService) {
  }

  createPatient(data: any) {
    return this.http.post(`${this.baseUrl}`, data)
  }

  editPatient(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data)
  }

  deactivatePatient(id: string, reason: string) {
    return this.http.put(`${this.baseUrl}/deactivate/${id}`, {reasonForDeactivate: reason})
  }

  activatePatient(id: string) {
    return this.http.put(`${this.baseUrl}/activate/${id}`, {})
  }

  getPatients(pageNo: number, pageSize: number, filterType?: string | null, filter?: string) {
    return this.http.get(`${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=name` + (filterType ? filterType ==='name'?  `&filterType=name&filterValue=${filter}`: '&filterType=deactivated' : ''))
      .pipe(cache(`${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=name` + (filterType ? filterType ==='name'?  `&filterType=name&filterValue=${filter}`: '&filterType=deactivated' : ''), this.storageService))

  }

  getPatient(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`,).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  getMedicine(id: string) {
    return this.http.get(`${this.baseUrl}/${id}/medicine`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }

  getHistory(id: string, year: string, month: string) {
    return this.http.get(`${this.baseUrl}/${id}/history?year=${year}&month=${month}`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }

  addHistory(id: string, year: string, month: string, body: any) {
    return this.http.post(`${this.historyUrl}/patient/${id}?year=${year}&month=${month}`, body)
  }

  deleteHistory(id: string) {
    return this.http.delete(`${this.historyUrl}/${id}`)
  }

  editHistory(id: string, body: any) {
    return this.http.put(`${this.historyUrl}/${id}`, body)
  }

  addMedicine(id: string, medicineId: string, data: any) {
    return this.http.post(`${this.baseUrl}/${id}/medicine/${medicineId}`, data)
  }

  editMedicine(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/medicine/${id}`, body)

  }

  deleteMedicine(id: string) {
    return this.http.delete(`${this.baseUrl}/medicine/${id}`)
  }

  deleteSpecialization(specializationId: string, id: string) {
    return this.http.delete(`${this.baseUrl}/${id}/specialization/${specializationId}`)
  }

  getHistoryDates(id: string, year: string) {
    return this.http.get(`${this.baseUrl}/${id}/history/dates?year=${year}`).pipe(
      map((res: any) => {
        return res.data
      })
    )

  }

  getAllMedicine(id: string) {
    return this.http.get(`${this.baseUrl}/${id}/medicine/all`).pipe(
      map((res: any) => {
        return res.data
      })
    )
  }
}
