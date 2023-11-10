import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  baseUrl = environment.medicine
  uploadUrl = environment.upload

  constructor(private http: HttpClient) {
  }

  getMedicines(pageNo: number, pageSize: number, filter?: string) {
    return this.http.get(`${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}` + (filter ? `&filter=${filter}` : ''))
  }

  deleteMedicine(id: string) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }

  replaceMedicine(firstId: number,
                  secondId: number,) {
    return this.http.get(`${this.baseUrl}/${firstId}/${secondId}`)

  }

  uploadFile(formDate: FormData) {
    return this.http.post(`${this.uploadUrl}`, formDate)
  }
}
