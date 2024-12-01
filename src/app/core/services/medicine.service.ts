import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { StatisticsResponse } from '../interfaces/medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  baseUrl = environment.medicine
  uploadUrl = environment.upload
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  addMedicine(body: any) {
    return this.http.post(`${this.baseUrl}`, body)
  }

  getMedicines(pageNo: number, pageSize: number, filter?: string) {
    return this.http.get(`${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}` + (filter ? `&filter=${filter}` : ''))
  }

  getMedicine(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      map((res: any) => {
        return res.data.nameInEng
      })
    )
  }

  deleteMedicine(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }

  getPatients(id: string, pageNo: number, pageSize: number,) {
    return this.http.get(`${this.baseUrl}/patient/${id}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=name`)
  }

  replaceMedicine(firstId: string,
                  secondId: any,) {
    return this.http.get(`${this.baseUrl}/${firstId}/${secondId.id}`)

  }

  uploadFile(formDate: FormData) {
    return this.http.post(`${this.uploadUrl}`, formDate, {
      headers: {
        responseType: "blob"
      }
    })
  }

  deactivateMedicine(medicineId: number, patientId: string) {
    return this.http.put(`${this.baseUrl}/${medicineId}/patient/${patientId}/deactivate`, {})
  }

  activateMedicine(medicineId: number, patientId: string) {
    return this.http.put(`${this.baseUrl}/${medicineId}/patient/${patientId}/activate`, {})
  }
  getStatistics(): Observable<StatisticsResponse>  {
    return this.http.get<StatisticsResponse>(`${this.apiUrl}/report/statistics`, {})  
  }
} 
