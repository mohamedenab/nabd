import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.report

  constructor(private http: HttpClient) {
  }

  getReport(pageNo: number, pageSize: number) {
    return this.http.get(`${this.baseUrl}?pageNo=${pageNo}&pageSize=${pageSize}`)
  }

  editReport(id: string, data: any) {
    return this.http.put(`${this.baseUrl}/medicine/amount/${id}`,data)
  }
  deleteMedicine(id: string) {
    return this.http.delete(`${this.baseUrl}/medicine/${id}`)
  }

  generateReport() {
    return this.http.post(`${this.baseUrl}`, {})
  }

  replaceMedicine(firstId: string,
                  secondId: any,) {
    return this.http.put(`${this.baseUrl}/medicine/${firstId}/newmedicine/${secondId.id}`,{})
  }
}
